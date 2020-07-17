import { Request, Response, NextFunction } from 'express';
import { CrudController } from './CrudController';
import { Category, Order, Product, User } from '../../models/mongoose';

interface IQuery {
  categories?: string[];
  ratings?: string[];
  price?: any;
}

class ProductController extends CrudController {
  public async index(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const {
        limit,
        skip,
        category,
        rating,
        min = 0,
        max = Number.MAX_SAFE_INTEGER,
      } = req.query;

      let products;
      let query: IQuery = {};

      if (category) {
        query.categories = category.split(',');
      }

      if (rating) {
        query.ratings = rating.split(',');
      }

      if (min || max) {
        query.price = { $lt: parseInt(max, 10), $gt: parseInt(min, 10) };
      }

      if (limit && skip) {
        const options = {
          limit: parseInt(limit, 10) || 10,
          page: parseInt(skip, 10) || 1,
          sort: { _createdAt: -1 },
          populate: 'category',
        };
        products = await Product.paginate(query, options);
      } else {
        console.log(query);
        products = await Product.find(query)
          .populate('category')
          .sort({ _createdAt: -1 })
          .exec();
      }

      return res.status(200).json(products);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  public async read(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    const { id } = req.params;

    try {
      // findOne will not populate the query, use find instead
      const product = await Product.findOne({ _id: id }).populate('categories');
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    const prodObj = {
      description: req.body.description,
      title: req.body.title,
      releaseDate: req.body.releaseDate,
      price: parseInt(req.body.price, 10),
      categories: req.body.categories,

      specifications: {
        brand: req.body.brand,
        warranty: req.body.warranty,
        developer: req.body.developer,
        publisher: req.body.publisher,
        menuLanguage: req.body.menuLanguage,
        spokenLanguage: req.body.spokenLanguage,
        PEGIage: req.body.PEGIage,
        PEGIcontent: req.body.PEGIcontent,
      },
    };

    try {
      const product = new Product(prodObj);

      await product.save();
      res.status(200).json({
        message: 'PRODUCT_CREATION_SUCCESS',
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    const { id } = req.params;
    req.body._modifiedAt = Date.now();

    try {
      const toUpdate = await Product.updateOne({ _id: id }, { $set: req.body });

      res.status(200).json({
        message: 'UPDATE_SUCCESS',
        updated: toUpdate,
      });
    } catch (err) {
      next(err);
    }
  }

  public async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    const { id } = req.params;

    try {
      const toDelete = await Product.findOneAndDelete({ _id: id }).exec();

      res.status(200).json({
        message: 'DELETE_SUCCESS',
        deleted: toDelete,
      });
    } catch (err) {
      next(err);
    }
  }

  // works for now....
  public async removeInvalidProducts(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    const { id } = req.params;

    try {
      // remove the specified product from all orders to prevent invalid items
      const result = await Order.updateMany(
        { list: { $elemMatch: { product: id } } },
        { $pull: { list: { product: id } } },
      );
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }
}

export default ProductController;
