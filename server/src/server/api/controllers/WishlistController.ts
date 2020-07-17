import { Request, Response, NextFunction } from 'express';
import { CrudController } from './CrudController';
import { IWishList, Wishlist } from '../../models/mongoose';
import { IDNotFoundError } from '../../utilities';

class WishlistController extends CrudController {
  public async index(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const { limit, skip } = req.query;
      let wishlists;

      if (limit && skip) {
        const options = {
          limit: parseInt(limit, 10) || 10,
          page: parseInt(skip, 10) || 1,
          sort: { _createdAt: -1 },
        };
        wishlists = await Wishlist.paginate({}, options);
      } else {
        wishlists = await Wishlist.find()
          .populate('userID')
          .populate('list.product')
          .sort({ _createdAt: -1 })
          .exec();
      }

      return res.status(200).json(wishlists);
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
      // findOne will not populate the query, use find instead
      const cart = await Wishlist.find({ userID: req.user.id })
        .populate('userID')
        .populate('list');
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
      // findOne will not populate the query, use find instead
      const cart = await Wishlist.find({ userID: id })
        .populate('userID')
        .populate('list');
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

    const newWishlist: IWishList = new Wishlist({
      userID: req.user.id,
      list,
    });

    const wishList: IWishList = await newWishlist.save();

    return res.status(200).json({
      wishList,
    });
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    req.body._modifiedAt = Date.now();

    try {
      const toUpdate = await Wishlist.updateOne(
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

  public async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    const { id } = req.params;

    try {
      if (!id) throw new IDNotFoundError();

      const toDelete = await Wishlist.findOneAndDelete({ userID: id }).exec();

      res.status(200).json({
        message: 'DELETE_SUCCESS',
        deleted: toDelete,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default WishlistController;
