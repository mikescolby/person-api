import * as express from "express";
import { Request, Response, NextFunction } from "express";

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

  public getPeople = (req: Request, res: Response, next: NextFunction) => {
    res.json(this.people);
  };

  public addPerson = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    let person = req.body.person;

    if (!person.firstName) {
      return res.status(400).send("Firstname is required");
    }

    if (!person.lastName) {
      return res.status(400).send("Lastname is required");
    }

    this.people.push(person);
    return res.send(200);
  };
}
