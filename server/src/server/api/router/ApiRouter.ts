import {
  default as express,
  Application,
  Request,
  Response,
  Router,
} from 'express';
import multer from 'multer';
import { IConfig, AuthService, Role } from '../../services';

import {
  UserController,
  CategoryController,
  ProductController,
  OrderController,
} from '../controllers';
import AuthController from '../controllers/AuthController';
import CartController from '../controllers/CartController';
import WishlistController from '../controllers/WishlistController';

class ApiRouter {
  public router: Router;
  public userController: UserController;
  public categoryController: CategoryController;
  public productController: ProductController;
  public authController: AuthController;
  public cartController: CartController;
  public wishlistController: WishlistController;
  public orderController: OrderController;

  public multerMiddleware: any;

  private readonly config: IConfig;
  private readonly authService: AuthService;

  constructor(config: IConfig, authService: AuthService) {
    this.config = config;
    this.authService = authService;
    this.setupMulter();

    this.router = express.Router();

    this.registerControllers();
    this.registerRoutes();
  }

  private setupMulter(): void {
    try {
      const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, './uploads/');
        },
        filename: (req, file, cb) => {
          cb(null, Date.now() + file.originalname);
        },
      });

      /*
      const filter = (req: Request, file: any, cb: any) => {
        if (
         file.mimeType === 'image/jpeg' ||
         file.mimeType === 'image/png' ||
         file.mimeType === 'image/jpg' ||
         file.mimeType === 'image/PNG'
        ) {
          cb(null, true);
        } else {
          cb(null, false);
        }
      };
*/

      this.multerMiddleware = multer({
        storage,
        limits: {
          fileSize: 1024 * 1024 * 5,
        },
      });
    } catch (err) {
      console.log(err);
    } finally {
      console.log('yes');
    }
  }

  private registerControllers(): void {
    this.authController = new AuthController(this.config, this.authService);
    this.userController = new UserController();
    this.categoryController = new CategoryController();
    this.productController = new ProductController();
    this.cartController = new CartController();
    this.wishlistController = new WishlistController();
    this.orderController = new OrderController();
  }

  private registerRoutes(): void {
    // Authentication routes
    this.router.post('/auth/signup', this.authController.signupLocal);

    this.router.post('/auth/signin', this.authController.signInLocal);

    this.router.post(
      '/oauth/facebook',
      this.authService.passport.authenticate('facebook'),
      this.authController.signInFacebook,
    );

    // Cart routes
    this.router.get(
      '/cart',
      this.authService.passport.authenticate('jwt', { session: false }),
      this.authService.checkIsInRole('administrator'),
      this.cartController.index,
    );

    this.router.get(
      '/cart/',
      this.authService.passport.authenticate('jwt', { session: false }),
      this.authService.checkIsInRole('user'),
      this.cartController.read,
    );

    this.router.get(
      '/cart/:id',
      this.authService.passport.authenticate('jwt', { session: false }),
      this.authService.checkIsInRole('administrator'),
      this.cartController.readAdmin,
    );

    this.router.post(
      '/cart/create',
      this.authService.passport.authenticate('jwt', { session: false }),
      this.authService.checkIsInRole('user', 'administrator'),
      this.cartController.create,
    );

    this.router.patch(
      '/cart/update',
      this.authService.passport.authenticate('jwt', { session: false }),
      this.authService.checkIsInRole('user', 'administrator'),
      this.cartController.update,
    );

    this.router.patch(
      '/cart/addProduct',
      this.authService.passport.authenticate('jwt', { session: false }),
      this.authService.checkIsInRole('user', 'administrator'),
      this.cartController.addProduct,
    );

    this.router.patch(
      '/cart/removeProduct/:id',
      this.authService.passport.authenticate('jwt', { session: false }),
      this.authService.checkIsInRole('user'),
      this.cartController.removeProduct,
    );

    this.router.delete(
      '/cart/delete/:id',
      this.authService.passport.authenticate('jwt', { session: false }),
      this.authService.checkIsInRole('administrator'),
      this.cartController.delete,
    );

    // wishlist routes
    this.router.get(
      '/wishlist',
      this.authService.passport.authenticate('jwt', { session: false }),
      this.authService.checkIsInRole('administrator'),
      this.wishlistController.index,
    );

    this.router.get(
      '/wishlist/',
      this.authService.passport.authenticate('jwt', { session: false }),
      this.authService.checkIsInRole('user', 'administrator'),
      this.wishlistController.read,
    );

    this.router.get(
      '/wishlist/:id',
      this.authService.passport.authenticate('jwt', { session: false }),
      this.authService.checkIsInRole('administrator'),
      this.wishlistController.readAdmin,
    );

    this.router.post(
      '/wishlist/create',
      this.authService.passport.authenticate('jwt', { session: false }),
      this.authService.checkIsInRole('user', 'administrator'),
      this.wishlistController.create,
    );

    this.router.patch(
      '/wishlist/update',
      this.authService.passport.authenticate('jwt', { session: false }),
      this.authService.checkIsInRole('user', 'administrator'),
      this.wishlistController.update,
    );

    this.router.delete(
      '/wishlist/delete/:id',
      this.authService.passport.authenticate('jwt', { session: false }),
      this.authService.checkIsInRole('user', 'administrator'),
      this.wishlistController.delete,
    );

    // User routes
    this.router.get(
      '/user',
      this.authService.passport.authenticate('jwt', { session: false }),
      this.authService.checkIsInRole('administrator'),
      this.userController.index,
    );

    this.router.get(
      '/user/read',
      this.authService.passport.authenticate('jwt', { session: false }),
      this.authService.checkIsInRole('user', 'administrator'),
      this.userController.read,
    );

    this.router.get(
      '/user/read/:id',
      this.authService.passport.authenticate('jwt', { session: false }),
      this.authService.checkIsInRole('administrator'),
      this.userController.readAdmin,
    );

    this.router.patch(
      '/user/update',
      this.authService.passport.authenticate('jwt', { session: false }),
      this.authService.checkIsInRole('user', 'administrator'),
      this.userController.update,
    );

    this.router.patch(
      '/user/update/:id',
      this.authService.passport.authenticate('jwt', { session: false }),
      this.authService.checkIsInRole('administrator'),
      this.userController.updateAdmin,
    );

    this.router.delete(
      '/user/delete/:id',
      this.authService.passport.authenticate('jwt', { session: false }),
      this.authService.checkIsInRole('administrator'),
      this.userController.delete,
    );

    // Category routes
    this.router.get('/category', this.categoryController.index);

    this.router.post(
      '/category/create',
      this.authService.passport.authenticate('jwt', { session: false }),
      this.authService.checkIsInRole('administrator'),
      this.categoryController.create,
    );

    this.router.get(
      '/category/:id',
      this.authService.passport.authenticate('jwt', { session: false }),
      this.categoryController.read,
    );

    this.router.patch(
      '/category/update/:id',
      this.authService.passport.authenticate('jwt', { session: false }),
      this.authService.checkIsInRole('administrator'),
      this.categoryController.update,
    );

    this.router.delete(
      '/category/delete/:id',
      this.authService.passport.authenticate('jwt', { session: false }),
      this.authService.checkIsInRole('administrator'),
      this.categoryController.delete,
    );

    // Product routes
    this.router.get('/product', this.productController.index);

    this.router.post(
      '/product/create',
      this.authService.passport.authenticate('jwt', { session: false }),
      this.authService.checkIsInRole('administrator'),
      this.multerMiddleware.array('productImage', 5),
      this.productController.create,
    );

    this.router.get('/product/:id', this.productController.read);

    this.router.patch(
      '/product/update/:id',
      this.authService.passport.authenticate('jwt', { session: false }),
      this.authService.checkIsInRole('administrator'),
      this.productController.update,
    );

    this.router.patch(
      '/product/clean/:id',
      this.authService.passport.authenticate('jwt', { session: false }),
      this.authService.checkIsInRole('administrator'),
      this.productController.removeInvalidProducts,
    );

    this.router.delete(
      '/product/delete/:id',
      this.authService.passport.authenticate('jwt', { session: false }),
      this.authService.checkIsInRole('administrator'),
      this.productController.delete,
    );

    // Order routes
    this.router.get(
      '/order',
      this.authService.passport.authenticate('jwt', { session: false }),
      this.authService.checkIsInRole('administrator'),
      this.orderController.index,
    );

    this.router.get(
      '/order/',
      this.authService.passport.authenticate('jwt', { session: false }),
      this.authService.checkIsInRole('user', 'administrator'),
      this.orderController.read,
    );

    this.router.patch(
      '/order/update/:id',
      this.authService.passport.authenticate('jwt', { session: false }),
      this.authService.checkIsInRole('administrator'),
      this.orderController.update,
    );

    this.router.get(
      '/order/:id',
      this.authService.passport.authenticate('jwt', { session: false }),
      this.authService.checkIsInRole('administrator'),
      this.orderController.readAdmin,
    );

    this.router.post(
      '/order/create',
      this.authService.passport.authenticate('jwt', { session: false }),
      this.authService.checkIsInRole('user', 'administrator'),
      this.orderController.create,
    );

    this.router.delete(
      '/order/delete/:id',
      this.authService.passport.authenticate('jwt', { session: false }),
      this.authService.checkIsInRole('administrator'),
      this.orderController.delete,
    );
  }
}

export default ApiRouter;
