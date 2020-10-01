import * as express from "express";

/**
 * Controller Interface
 */
export interface Controller {
  /**
   * ExpressJS router property used in initRoutes
   */
  router: express.Router;

  /**
   * Initialize controller routes
   */
  initRoutes(): void;
}
