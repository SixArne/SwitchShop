import { default as mongoose, Document, PaginateModel, Schema } from 'mongoose';

export interface ICart extends Document {
  accountID?: string;
  items: string[];
}

export interface ICartModel extends PaginateModel<ICart> {}

export const cartSchema: Schema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  list: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: { type: Number, default: 1 },
    },
  ],
});

export const Cart = mongoose.model<ICart, ICartModel>('Cart', cartSchema);
