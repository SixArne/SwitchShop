import { default as mongoose, Document, PaginateModel, Schema } from 'mongoose';
import { default as mongoosePaginate } from 'mongoose-paginate';

export interface ISpecifications {
  brand: string;
  warranty: string;
  developer: string;
  publisher: string;
  menuLanguage: string;
  spokenLanguage: string;
  PEGIage: string;
  PEGIcontent: string;
}

export interface IProduct extends Document {
  description: string;
  title: string;
  releaseDate: string;
  price: number;
  categories: string[];
  images: string[];
  specifications: ISpecifications;
  __createdAt: number;
  __modifiedAt: number;
  __deletedAt: number;
}

export interface IProductModel extends PaginateModel<IProduct> {}

export const productSchema: Schema = new Schema({
  description: { type: String, required: true, unique: false, max: 2056 },
  title: { type: String, required: true, unique: false, max: 120 },
  releaseDate: { type: String, required: true },
  price: { type: Number, required: true },
  categories: [
    { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  ],
  images: [{ type: String, required: false }],
  specifications: {
    brand: { type: String, required: true },
    warranty: { type: String, required: true },
    developer: { type: String, required: true },
    publisher: { type: String, required: true },
    menuLanguage: { type: String, required: true },
    spokenLanguage: { type: String, required: true },
    PEGIage: { type: String, required: true },
    PEGIcontent: { type: String, required: true },
  },
  __createdAt: { type: Number, required: false, default: Date.now() },
  __modifiedAt: { type: Number, required: false, default: null },
  __deletedAt: { type: Number, required: false, default: null },
  amountBought: { type: Number, required: false, default: 0 },
});

productSchema.plugin(mongoosePaginate);

export const Product = mongoose.model<IProduct, IProductModel>(
  'Product',
  productSchema,
);
