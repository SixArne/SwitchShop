import { default as mongoose, Schema, Document, PaginateModel } from 'mongoose';
import { default as bcrypt } from 'bcrypt';
import { IProduct } from './product.model';

interface ILocalProvider {
  password: string;
}

interface IFacebookProvider {
  id: string;
  token: string;
}

interface IProfile {
  firstname: string;
  lastname: string;
  streetname: string;
  housenumber: number;
  busnumber?: number;
  postalcode: number;
  placeofresidence: string;
  phonenumber?: string;
}

interface IUser extends Document {
  email: string;
  _createdAt: number;
  _modifiedAt: number;
  _deletedAt: number;

  localProvider?: ILocalProvider;
  facebookProvider?: IFacebookProvider;

  gamesBought?: string[];
  cart?: string[];

  role: string;
  profile?: IProfile;
  softdeleted: boolean;

  comparePassword(candidatePassword: string, cb: Function): void;
}

export interface IUserModel extends PaginateModel<IUser> {}

const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      max: 124,
    },
    _createdAt: { type: Number, required: true, default: Date.now() },
    _modifiedAt: { type: Number, required: false, default: null },
    _deletedAt: { type: Number, required: false, default: null },
    localProvider: {
      password: {
        type: String,
        required: false,
      },
    },
    facebookProvider: {
      id: {
        type: String,
        required: false,
      },
      token: {
        type: String,
        required: false,
      },
    },
    gamesBought: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    cart: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Cart',
      },
    ],
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Wishlist',
      },
    ],
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
    role: {
      type: String,
      enum: ['user', 'administrator', 'moderator'],
      default: 'user',
      required: true,
    },
    profile: {
      firstname: { type: String, required: false, max: 25 },
      lastname: { type: String, required: false, max: 25 },
      streetname: { type: String, required: false, max: 100 },
      housenumber: { type: Number, required: false },
      busnumber: { type: Number, required: false, default: null },
      postalcode: { type: Number, required: false },
      placeofresidence: { type: String, required: false },
      phonenumber: { type: String, required: false, default: null },
    },
    softdeleted: {
      type: Number,
      required: false,
      default: null,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

userSchema.pre('save', function(next) {
  const user: IUser = this as IUser;

  if (!user.isModified('localProvider.password')) return next();

  try {
    return bcrypt.genSalt(10, (errSalt, salt) => {
      if (errSalt) throw errSalt;

      bcrypt.hash(user.localProvider.password, salt, (errHash, hash) => {
        if (errHash) throw errHash;

        user.localProvider.password = hash;
        return next();
      });
    });
  } catch (err) {
    return next(err);
  }
});

userSchema.virtual('id').get(function() {
  return this._id;
});

userSchema.methods.comparePassword = function(
  candidatePassword: string,
  cb: Function,
) {
  const user = this;
  console.log(user);
  bcrypt.compare(
    candidatePassword,
    user.localProvider.password,
    (err, isMatch) => {
      if (err) return cb(err, null);
      return cb(null, isMatch);
    },
  );
};

const User = mongoose.model<IUser, IUserModel>('User', userSchema);

export { IUser, User, userSchema };
