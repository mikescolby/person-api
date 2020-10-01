import { Request, Response, NextFunction, RequestHandler } from "express";

export interface Middleware {
  execute(req: Request, res: Response, next: NextFunction): void;
}
