import * as express from 'express';
import * as xmlBodyParser from 'express-xml-bodyparser';
import * as logger from "morgan";

import { Server } from "./server";

import {
} from "./controllers";

const server = new Server({
  port: 3000,
  controllers: [
  ],
  middlewares: [
    express.json(),
    xmlBodyParser({ normalize: false, normalizeTags: false, explicitArray: false, explicitRoot: false }),
    logger("dev")
  ],
});

server.start();
