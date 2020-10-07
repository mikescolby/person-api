import express from 'express';
import xmlBodyParser from 'express-xml-bodyparser';
import logger from "morgan";

import { Server } from "./server";

import {
  UserController
} from "./controllers";

const server = new Server({
  port: 3000,
  controllers: [
    new UserController()
  ],
  middlewares: [
    express.json(),
    xmlBodyParser({ normalize: false, normalizeTags: false, explicitArray: false, explicitRoot: false }),
    logger("dev")
  ],
});

server.start();
