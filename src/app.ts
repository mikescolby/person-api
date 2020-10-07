import * as express from 'express';
import * as xmlBodyParser from 'express-xml-bodyparser';
import * as logger from "morgan";

import { Server } from "./server";

import {
  PersonController,
} from "./controllers";

import { AddressController } from './address';

const server = new Server({
  port: 3000,
  controllers: [
    new AddressController(),
    new PersonController(),
  ],
  middlewares: [
    express.json(),
    xmlBodyParser({ normalize: false, normalizeTags: false, explicitArray: false, explicitRoot: false }),
    logger("dev")
  ],
});

server.start();
