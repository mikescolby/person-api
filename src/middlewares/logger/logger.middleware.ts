import { Request, Response, NextFunction } from "express";

import { Middleware } from "../middleware.interface";

export class LoggerMiddleware implements Middleware {
  execute = (req: Request, resp: Response, next: NextFunction): void => {
    // console.log(req.path);
    next();
  };
}
