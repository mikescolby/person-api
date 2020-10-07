import express from "express";

/**
 * Controller Interface
 */
export abstract class Controller {
  /**
   * ExpressJS router property used in initRoutes
   */
  public router: express.Router;
  
  /**
   * Initialize controller routes
   */
  abstract initRoutes(): void;

  constructor() {
    this.router = express.Router();
  }
}
