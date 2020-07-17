import { Request, Response, NextFunction } from 'express';
import { CrudController } from './CrudController';
import { IOrder, Order } from '../../models/mongoose';

class OrderController extends CrudController {
  public async index(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const { limit, skip } = req.query;
      let orders;

      if (limit && skip) {
        const options = {
          limit: parseInt(limit, 10) || 10,
          page: parseInt(skip, 10) || 1,
          sort: { _createdAt: -1 },
        };
        orders = await Order.paginate({}, options);
      } else {
        orders = await Order.find()
          .populate('userID')
          .populate('list.product')
          .sort({ _createdAt: -1 })
          .exec();
      }

      return res.status(200).json(orders);
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
      const cart = await Order.find({ userID: req.user.id })
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
      const cart = await Order.findOne({ _id: id })
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

    const newOrder: IOrder = new Order({
      userID: req.user.id,
      list,
    });

    const order: IOrder = await newOrder.save();

    return res.status(200).json({
      order,
    });
  }

  public async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    const { id } = req.params;

    try {
      const toDelete = await Order.findOneAndDelete({ _id: id }).exec();

      res.status(200).json({
        message: 'DELETE_SUCCESS',
        deleted: toDelete,
      });
    } catch (err) {
      next(err);
    }
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    const { id } = req.params;

    try {
      const toDelete = await Order.findByIdAndUpdate(id, {
        $set: { completedAt: Date.now() },
      });

      res.status(200).json({
        message: 'DELETE_SUCCESS',
        deleted: toDelete,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default OrderController;
