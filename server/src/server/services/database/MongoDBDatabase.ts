import { default as mongoose, Connection } from 'mongoose';
import { default as faker } from 'faker';

import { ILogger } from '../logger';
import { IConfig } from '../config';
import {
  IUser,
  User,
  ICategory,
  Category,
  IWishList,
  IOrder,
  IProduct,
  ICart,
  Product,
  Order,
  Cart,
  Wishlist,
} from '../../models/mongoose';

class MongoDBDatabase {
  private config: IConfig;
  private logger: ILogger;
  private db: Connection;

  private wishLists: IWishList[];
  private categories: ICategory[];
  private orders: IOrder[];
  private users: IUser[];
  private products: IProduct[];
  private carts: ICart[];

  constructor(logger: ILogger, config: IConfig) {
    this.logger = logger;
    this.config = config;

    this.wishLists = [];
    this.categories = [];
    this.orders = [];
    this.users = [];
    this.products = [];
    this.carts = [];
  }

  public connect(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      mongoose
        .connect(this.config.mongoDBConnection, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(data => {
          this.db = mongoose.connection;

          this.logger.info('Connected to the mongodb database', {});

          resolve(true);
        })
        .catch(error => {
          this.logger.error("Can't connect to the database", error);

          reject(error);
        });
    });
  }

  public disconnect(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.db
        .close(true)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          this.logger.error("Can't disconnect the database", error);

          reject(error);
        });
    });
  }

  public pickRandomGames(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const gameAmount: number = Math.floor(Math.random() * 5);
      const games = Array(gameAmount);

      for (let i = 0; i < gameAmount; i += 1) {
        const randomGameIndex: number = Math.floor(
          Math.random() * this.products.length,
        );
        games.push(this.products[randomGameIndex]);
      }

      resolve(games);
    });
  }

  public pickRandomCategories(): Promise<any> {
    return new Promise((resolve, reject) => {
      const categoryAmount: number = Math.floor(Math.random() * 3);
      const categories = Array(categoryAmount);

      for (let i = 0; i < categoryAmount; i += 1) {
        categories.push(this.getRandomCategory());
      }

      resolve(categories);
    });
  }

  private userCreate = async (
    email: string,
    password: string,
    role: string,
    firstname: string,
    lastname: string,
    streetname: string,
    housenumber: number,
    postalcode: number,
    placeofresidence: string,
    phonenumber: string,
    gamesBought?: string[],
  ) => {
    const userDetail = {
      role,
      email,
      gamesBought,
      localProvider: {
        password,
      },
      profile: {
        firstname,
        lastname,
        streetname,
        housenumber,
        postalcode,
        placeofresidence,
        phonenumber,
      },
    };

    const user: IUser = new User(userDetail);

    try {
      const createdUser = await user.save();
      this.users.push(createdUser);

      this.logger.info(`User created with id: ${createdUser._id}`, {});
    } catch (err) {
      this.logger.error(`An error occurred when creating a user ${err}`, err);
    }
  };

  private async createUsers() {
    const promises = [];
    const adminGames = await this.pickRandomGames();

    await this.userCreate(
      'six.arne@gmail.com',
      'test123',
      'administrator',
      'Arne',
      'Six',
      'Sint-Jansdreef',
      23,
      9000,
      'Gent',
      '0478740168',
      adminGames,
    );

    for (let i = 0; i < 8; i += 1) {
      const games = await this.pickRandomGames();

      promises.push(
        this.userCreate(
          faker.internet.email(),
          faker.internet.password(),
          'user',
          faker.name.firstName(),
          faker.name.lastName(),
          faker.address.streetName(),
          23,
          9000,
          'San Fransisco',
          faker.phone.phoneNumber(),
          games,
        ),
      );
    }

    return await Promise.all(promises);
  }

  private async productCreate(
    description: string,
    title: string,
    releaseDate: string,
    price: number,
    categories: string[],
    images: string[],
    brand: string,
    warranty: string,
    developer: string,
    publisher: string,
    menuLanguage: string,
    spokenLanguage: string,
    PEGIage: string,
    PEGIcontent: string,
  ) {
    const productDetail = {
      description,
      title,
      releaseDate,
      price,
      categories,
      images,
      specifications: {
        brand,
        warranty,
        developer,
        publisher,
        menuLanguage,
        spokenLanguage,
        PEGIage,
        PEGIcontent,
      },
    };

    const product: IProduct = new Product(productDetail);
    try {
      const createdProduct = await product.save();
      this.products.push(createdProduct);

      this.logger.info(`Product created with id: ${createdProduct._id}`, {});
    } catch (err) {
      this.logger.error(
        `An error occurred when creating a product ${err}`,
        err,
      );
    }
  }

  private async createProducts() {
    const promises = [];

    for (let i = 0; i < 30; i += 1) {
      const categories = await this.pickRandomCategories();

      promises.push(
        this.productCreate(
          faker.commerce.productMaterial(),
          faker.commerce.product(),
          faker.date.month(),
          Number(faker.commerce.price()),
          categories,
          [faker.internet.avatar()],
          faker.commerce.product(),
          faker.commerce.product(),
          faker.commerce.product(),
          faker.commerce.product(),
          faker.commerce.product(),
          faker.commerce.product(),
          faker.commerce.product(),
          faker.commerce.product(),
        ),
      );
    }
    return await Promise.all(promises);
  }

  private getRandomCategory() {
    let category: ICategory = null;
    if (this.categories && this.categories.length > 0) {
      category = this.categories[
        Math.floor(Math.random() * this.categories.length)
      ];
    }
    return category;
  }

  private async categoryCreate(name: string, description: string) {
    const categoryDetail = {
      name,
      description,
    };

    const category: ICategory = new Category(categoryDetail);

    try {
      const createdCategory = await category.save();
      this.categories.push(createdCategory);

      this.logger.info(`Category created with id: ${createdCategory._id}`, {});
    } catch (err) {
      this.logger.error(
        `An error occurred when creating a category ${err}`,
        err,
      );
    }
  }

  private async createCategories() {
    const promises = [];

    for (let i = 0; i < 8; i += 1) {
      promises.push(
        this.categoryCreate(faker.lorem.word(), faker.lorem.paragraph()),
      );
    }

    return await Promise.all(promises);
  }

  private async orderCreate(userID: string, list: any[]) {
    const orderDetail = {
      userID,
      list,
    };

    const order: IOrder = new Order(orderDetail);

    try {
      const createdOrder = await order.save();
      this.orders.push(createdOrder);

      this.logger.info(`Order created with id: ${createdOrder._id}`, {});
    } catch (err) {
      this.logger.error(`An error occurred when creating an order ${err}`, err);
    }
  }

  private async createOrders() {
    const promises = [];

    for (let i = 0; i < 8; i += 1) {
      promises.push(
        this.orderCreate(this.users[i]._id, [
          {
            product: this.products[0]._id,
            quantity: 1,
          },
        ]),
      );
    }

    return await Promise.all(promises);
  }

  private async cartCreate(userID: string, list: any[]) {
    const cartDetail = {
      userID,
      list,
    };

    const cart: ICart = new Cart(cartDetail);

    try {
      const createdCart = await cart.save();
      this.carts.push(createdCart);

      this.logger.info(`Cart created with id: ${createdCart._id}`, {});
    } catch (err) {
      this.logger.error(`An error occurred when creating a cart ${err}`, err);
    }
  }

  private async createCarts() {
    const promises = [];

    for (let i = 0; i < 8; i += 1) {
      promises.push(
        this.cartCreate(this.users[i]._id, [
          {
            product: this.products[0]._id,
            quantity: 1,
          },
        ]),
      );
    }

    return await Promise.all(promises);
  }

  private async wishListCreate(userID: string, list: any[]) {
    const wishListDetail = {
      userID,
      list,
    };

    const wishlist: IWishList = new Wishlist(wishListDetail);

    try {
      const createdWishlist = await wishlist.save();
      this.wishLists.push(createdWishlist);

      this.logger.info(`Wishlist created with id: ${createdWishlist._id}`, {});
    } catch (err) {
      this.logger.error(
        `An error occurred when creating a wishlist ${err}`,
        err,
      );
    }
  }

  private async createWishLists() {
    const promises = [];

    for (let i = 0; i < 8; i += 1) {
      promises.push(
        this.wishListCreate(this.users[i]._id, [this.products[0]._id]),
      );
    }

    return await Promise.all(promises);
  }

  public async seed() {
    this.categories = await Category.estimatedDocumentCount()
      .exec()
      .then(async count => {
        if (count === 0) {
          await this.createCategories();
        }
        return Category.find().exec();
      });

    this.products = await Product.estimatedDocumentCount()
      .exec()
      .then(async count => {
        if (count === 0) {
          await this.createProducts();
        }
        return Product.find().exec();
      });

    this.users = await User.estimatedDocumentCount()
      .exec()
      .then(async count => {
        if (count === 0) {
          await this.createUsers();
        }
        return User.find().exec();
      });

    this.orders = await Order.estimatedDocumentCount()
      .exec()
      .then(async count => {
        if (count === 0) {
          await this.createOrders();
        }
        return Order.find().exec();
      });

    this.carts = await Cart.estimatedDocumentCount()
      .exec()
      .then(async count => {
        if (count === 0) {
          await this.createCarts();
        }
        return Cart.find().exec();
      });

    this.wishLists = await Wishlist.estimatedDocumentCount()
      .exec()
      .then(async count => {
        if (count === 0) {
          await this.createWishLists();
        }
        return Wishlist.find().exec();
      });
  }
}

export default MongoDBDatabase;
