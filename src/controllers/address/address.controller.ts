import * as express from "express";
import { Request, Response, NextFunction } from "express";

import { Controller } from "../controller.interface";

export class AddressController implements Controller {
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes = () => {
    this.router.get("/address", this.getAddress);
  };

  private getAddress = (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "address" });
  };
}
