import * as bodyParser from "body-parser";
import * as logger from "morgan";

import { Server, ServerConfig } from "./server";

import { IndexController, PersonController } from "./controllers";
import { LoggerMiddleware } from "./middlewares";

let serverConfig = new ServerConfig();
serverConfig.port = 3000;
serverConfig.controllers = [new IndexController(), new PersonController()];
serverConfig.middlewares = [
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  logger("dev"),
  new LoggerMiddleware().execute,
];

const server = new Server(serverConfig);
server.listen();
