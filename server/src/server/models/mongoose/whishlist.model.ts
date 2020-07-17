import { default as mongoose, Document, PaginateModel, Schema } from 'mongoose';

export interface IWishList extends Document {
  userID: string;
  list: any[];
}

export interface IWishlistModel extends PaginateModel<IWishList> {}

export const wishList: Schema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: 'User' },
  list: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
});

export const Wishlist = mongoose.model<IWishList, IWishList>(
  'Wishlist',
  wishList,
);
