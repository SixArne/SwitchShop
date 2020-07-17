import { NextFunction, Request, Response } from 'express';
import { User, IUser } from '../../models/mongoose';

import { AuthService, IConfig } from '../../services';
import { NotFoundError } from '../../utilities';

class AuthController {
  private authService: AuthService;
  private config: IConfig;

  constructor(config: IConfig, authService: AuthService) {
    this.config = config;
    this.authService = authService;
  }

  public signupLocal = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { email, password, firstname, lastname } = req.body;
      console.log(`email is: ${email}`);

      let foundUser = await User.findOne({ email });
      if (foundUser) {
        return res.status(403).json({ error: 'Email is already in use' });
      }

      const newUser: IUser = new User({
        email,
        localProvider: {
          password,
        },
        profile: {
          firstname,
          lastname,
        },
      });

      const user: IUser = await newUser.save();

      const token = this.authService.createToken(user);
      return res.status(200).json({
        email: user.email,
        token: `${token}`,
        strategy: 'local',
        role: user.role,
      });
    } catch (err) {
      console.log(err);
    }
  };

  signInLocal = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { password } = req.body;
    console.log(password);

    this.authService.passport.authenticate(
      'local',
      { session: this.config.auth.jwt.session },
      (err, user, info) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return next(new NotFoundError());
        }

        const token = this.authService.createToken(user);
        return res.status(200).json({
          email: user.email,
          token: `${token}`,
          strategy: 'local',
          role: user.role,
        });
      },
    )(req, res, next);
  };

  signInFacebook = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    this.authService.passport.authenticate(
      'facebook',
      { session: this.config.auth.jwt.session },
      (err, user, info) => {
        console.log(user);
      },
    )(req, res, next);
  };
}

export default AuthController;
