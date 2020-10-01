import * as express from "express";
import { Request, Response, NextFunction } from "express";
import { isConstructorDeclaration } from "typescript";

import { Person } from "../../models";
import { Controller } from "../controller.interface";

export class PersonController implements Controller {
  public router = express.Router();
  private people: Person[];

  constructor() {
    this.initRoutes();

    this.people = [];
  }

  public initRoutes = () => {
    this.router.get("/person", this.getPeople);
    this.router.post("/person", this.addPerson);
  };

  private getPeople = (req: Request, res: Response, next: NextFunction) => {
    res.json(this.people);
  };

  private addPerson = (req: Request, res: Response, next: NextFunction) => {
    let firstName: string = req.body.firstName;
    if (!firstName) {
      return res.status(400).send("Firstname is required");
    }

    let lastName: string = req.body.lastName;
    if (!lastName) {
      return res.status(400).send("Lastname is required");
    }

    this.people.push({
      firstName: firstName,
      lastName: lastName,
    });

    return res.json(this.people[-1]);
  };
}
