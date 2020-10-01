import * as express from "express";
import { Request, Response, NextFunction } from "express";

import { Controller } from "../controller.interface";

/**
 * Index Controller
 */
export class IndexController implements Controller {
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes = () => {
    this.router.get("/", this.index);
    this.router.get("/hello", this.hello);
  };

  public index = (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "hello world" });
  };

  public hello = (req: Request, res: Response, next: NextFunction) => {
    let name = req.query.name;
    if (!name) {
      res.status(400).json({ message: "Name is required" });
    }

    res.status(200).json({ message: "Hello, " + name });
  };
}
