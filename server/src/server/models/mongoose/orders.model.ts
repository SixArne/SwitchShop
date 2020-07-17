import { default as mongoose, Schema, Document, PaginateModel } from 'mongoose';

export interface IOrder extends Document {
  userID: string;
  list: any[];
}

export interface IOrderModel extends PaginateModel<IOrder> {}

export const orderSchema: Schema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: 'User' },
  list: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: { type: Number, default: 1 },
    },
  ],
  completedAt: { type: Number, default: null },
});

export const Order = mongoose.model<IOrder, IOrderModel>('Order', orderSchema);
