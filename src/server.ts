import * as express from "express";
import { RequestHandler } from "express";

import { Controller } from "./controllers";

export interface ServerConfig {
  port: number;
  controllers: Controller[];
  middlewares: RequestHandler[];
}

export class Server {
  public app: express.Application;
  private port: number;

  constructor(config: ServerConfig) {
    this.app = express();
    this.port = config.port;

    this.registerMiddleware(config.middlewares);
    this.registerControllers(config.controllers);
  }

  private registerMiddleware(middleWares: RequestHandler[]) {
    middleWares.forEach((middleware) => {
      this.app.use(middleware);
    });
  }

  private registerControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  public start() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`);
    });
  }
}
