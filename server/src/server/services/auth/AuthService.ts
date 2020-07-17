import { Request, Response, NextFunction } from 'express';
import { default as passport, PassportStatic } from 'passport';
import { default as passportLocal } from 'passport-local';
import { default as passportJwt } from 'passport-jwt';
import { default as passportFacebook } from 'passport-facebook';
import { default as jwt } from 'jsonwebtoken';

import { Environment, IConfig } from '../config';
import { IUser, User } from '../../models/mongoose';
import { UnauthorizedError, ForbiddenError } from '../../utilities';

class AuthService {
  private config: IConfig;
  public passport: PassportStatic;
  private LocalStrategy = passportLocal.Strategy;
  private FacebookStrategy = passportFacebook.Strategy;
  private ExtractJwt = passportJwt.ExtractJwt;
  private JwtStrategy = passportJwt.Strategy;

  constructor(config: IConfig) {
    this.config = config;

    this.initializeLocalStrategy();
    this.initializeJwtStrategy();
    this.initializeFacebookStrategy();
    passport.serializeUser((user, done) => {
      done(null, user);
    });
    passport.deserializeUser((user, done) => {
      done(null, user);
    });

    this.passport = passport;
  }

  private initializeLocalStrategy() {
    passport.use(
      new this.LocalStrategy(
        {
          usernameField: 'email',
        },
        async (email: string, password: string, done) => {
          try {
            const user = await User.findOne({
              email,
            });

            if (!user) {
              return done(null, false, { message: 'No user by that email' });
            }

            return user.comparePassword(
              password,
              (err: any, isMatch: boolean) => {
                console.log(err);
                if (!isMatch) {
                  return done(null, false);
                }
                return done(null, user);
              },
            );
          } catch (error) {
            return done(error, false);
          }
        },
      ),
    );
  }

  private initializeFacebookStrategy() {
    passport.use(
      new this.FacebookStrategy(
        {
          clientID: '219368752704012',
          clientSecret: '6cb3a8f1074d205caeaf14f30bbd4c1e',
          callbackURL: 'http://localhost',
        },
        async (accessToken, refreshToken, profile, done) => {
          const user = await User.findOne({ 'facebook.id': profile.id });
          if (user) {
            return done(null, user);
          }

          const newUser = new User({
            email: profile.emails[0].value,
            facebook: {
              id: profile.id,
            },
          });
        },
      ),
    );
  }

  initializeJwtStrategy = () => {
    passport.use(
      new this.JwtStrategy(
        {
          secretOrKey: this.config.auth.jwt.secret,
          jwtFromRequest: this.ExtractJwt.fromAuthHeaderAsBearerToken(),
        },
        async (jwtPayload, done) => {
          try {
            const { id } = jwtPayload;

            const user = await User.findById(id);

            if (!user) {
              return done(null, false);
            }

            return done(null, user);
          } catch (error) {
            return done(error, false);
          }
        },
      ),
    );
  };

  public createToken(user: IUser): string {
    const payload = {
      id: user._id,
    };
    return jwt.sign(payload, this.config.auth.jwt.secret, {
      expiresIn: '2 days',
    });
  }

  public checkIsInRole = (...roles: string[]) => (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    if (!req.user) {
      next(new ForbiddenError());
    }

    const hasRole = roles.find(role => (req.user as IUser).role === role);
    if (!hasRole) {
      next(new UnauthorizedError());
    }

    return next();
  };
}

export default AuthService;
