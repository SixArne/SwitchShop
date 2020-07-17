import { Request, Response, NextFunction } from 'express';
import { User, IUser } from '../../models/mongoose';

class UserController {
  public async index(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const { limit, skip } = req.query;
      let users;

      if (limit && skip) {
        const options = {
          limit: parseInt(limit, 10) || 10,
          page: parseInt(skip, 10) || 1,
          sort: { _createdAt: -1 },
        };
        users = await User.paginate({}, options);
      } else {
        users = await User.find()
          .populate('cart')
          .populate('gamesBought')
          .populate('wishlist')
          .sort({ _createdAt: -1 })
          .exec();
      }

      return res.status(200).json(users);
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
    try {
      const fetchedUser = await User.findOne({ _id: req.user.id })
        .populate('cart')
        .populate('gamesBought')
        .populate('wishlist')
        .exec();
      res.status(200).json(fetchedUser);
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
      const fetchedUser = await User.findOne({ _id: id })
        .populate('cart')
        .populate('gamesBought')
        .populate('wishlist')
        .exec();
      res.status(200).json(fetchedUser);
    } catch (err) {
      next(err);
    }
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    req.body._modifiedAt = Date.now();

    try {
      const toUpdate = await User.updateOne(
        { _id: req.user.id },
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

  public async updateAdmin(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    const { id } = req.params;

    req.body._modifiedAt = Date.now();

    try {
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

export default UserController;
