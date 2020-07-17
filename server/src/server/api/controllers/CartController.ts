import { Request, Response, NextFunction } from 'express';
import { CrudController } from './CrudController';
import {
  Cart,
  Category,
  ICart,
  IUser,
  Product,
  User,
} from '../../models/mongoose';
import { IDNotFoundError } from '../../utilities';

class CartController extends CrudController {
  public async index(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const { limit, skip } = req.query;
      let carts;

      if (limit && skip) {
        const options = {
          limit: parseInt(limit, 10) || 10,
          page: parseInt(skip, 10) || 1,
          sort: { _createdAt: -1 },
        };
        carts = await Cart.paginate({}, options);
      } else {
        carts = await Cart.find()
          .populate('userID')
          .populate('list.product')
          .sort({ _createdAt: -1 })
          .exec();
      }

      return res.status(200).json(carts);
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
      const cart = await Cart.find({ userID: req.user.id })
        .populate('userID')
        .populate('list.product');
      res.status(200).json(cart);
    } catch (err) {
      next(err);
    }
  }

  public async readAdmin(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    const { id } = req.params;

    try {
      const cart = await Cart.find({ userID: id })
        .populate('userID')
        .populate('list.product');
      res.status(200).json(cart);
    } catch (err) {
      next(err);
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    const { list } = req.body;

    const newCart: ICart = new Cart({
      userID: req.user.id,
      list,
    });

    const cart: ICart = await newCart.save();

    return res.status(200).json({
      cart,
    });
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    req.body._modifiedAt = Date.now();

    try {
      const toUpdate = await Cart.updateOne(
        { userID: req.user.id },
        { $set: req.body },
      );

      res.status(200).json({
        message: 'UPDATE_SUCCESS',
        updated: toUpdate,
      });
    } catch (err) {
      next(err);
    }
  }

  public async addProduct(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    const productToPush = {
      quantity: req.body.quantity,
      product: req.body.productId,
    };

    req.body._modifiedAt = Date.now();

    try {
      const toUpdate = await Cart.updateOne(
        { userID: req.user.id },
        { $push: { list: productToPush } },
      );

      res.status(200).json({
        message: 'INSERT_SUCCESS',
        updated: toUpdate,
      });
    } catch (err) {
      next(err);
    }
  }

  public async removeProduct(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    const { id } = req.params;

    req.body._modifiedAt = Date.now();

    try {
      const toUpdate = await Cart.updateOne(
        { userID: req.user.id },
        { $pull: { list: { product: id } } },
        { $multi: true },
      );

      res.status(200).json({
        message: 'INSERT_SUCCESS',
        updated: toUpdate,
      });
    } catch (err) {
      console.log(err);
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

      const toDelete = await Cart.findOneAndDelete({ _id: id }).exec();

      res.status(200).json({
        message: 'DELETE_SUCCESS',
        deleted: toDelete,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default CartController;
