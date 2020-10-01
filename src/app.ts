import * as express from 'express';
import * as xmlBodyParser from 'express-xml-bodyparser';
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
    express.json(),
    express.urlencoded(),
    xmlBodyParser({normalize: false, normalizeTags: false, explicitArray: false}),
    logger("dev"),
    new LoggerMiddleware().execute,
  ],
});

server.start();
