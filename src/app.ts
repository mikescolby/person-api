import * as bodyParser from "body-parser";
import * as logger from "morgan";

import { Server } from "./server";

import {
  IndexController,
  PersonController,
  AddressController,
} from "./controllers";
import { LoggerMiddleware } from "./middlewares";

const server = new Server({
  port: 3000,
  controllers: [
    new AddressController(),
    new IndexController(),
    new PersonController(),
  ],
  middlewares: [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    logger("dev"),
    new LoggerMiddleware().execute,
  ],
});

server.start();
