import { NextFunction, Request, Response } from 'express';

// Abstract CrudController to force method implementation
export abstract class CrudController {
  public abstract index(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any>;

  public abstract read(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any>;

  public abstract create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any>;

  public abstract update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any>;

  public abstract delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any>;
}
