import { Request, Response, NextFunction } from 'express';
import { CrudController } from './CrudController';
import { Category, User } from '../../models/mongoose';
import { IDNotFoundError } from '../../utilities';

class CategoryController extends CrudController {
  public async index(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const { limit, skip } = req.query;
      let categories;

      if (limit && skip) {
        const options = {
          limit: parseInt(limit, 10) || 10,
          page: parseInt(skip, 10) || 1,
          sort: { _createdAt: -1 },
        };
        categories = await Category.paginate({}, options);
      } else {
        categories = await Category.find()
          .sort({ _createdAt: -1 })
          .exec();
      }

      return res.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  }

  public async read(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const { id } = req.params;

      const post = await Category.findById(id).exec();
      return res.status(200).json(post);
    } catch (err) {
      next(err);
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    const catObj = {
      name: req.body.categoryName,
      description: req.body.categoryDescription,
      slug: req.body.categorySlug,
    };

    try {
      const category = new Category(catObj);
      await category.save();
      res.status(200).json({
        message: 'CATEGORY_CREATION_SUCCESS',
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
      if (!id) throw new IDNotFoundError();

      const toUpdate = await User.updateOne({ _id: id }, { $set: req.body });

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
      if (!id) throw new IDNotFoundError();

      const toDelete = await User.findOneAndDelete({ _id: id }).exec();

      res.status(200).json({
        message: 'DELETE_SUCCESS',
        deleted: toDelete,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default CategoryController;
