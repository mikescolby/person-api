import * as express from "express";
import { Request, Response, NextFunction } from "express";
import { body, checkSchema, validationResult } from 'express-validator';

import { Person } from "./person.model";
// import { PersonValidator } from './person.validator';
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
    this.router.post("/person",
      [validatePerson],
      this.addPerson);
  };

  public getPeople = (req: Request, res: Response, next: NextFunction) => {
    res.json(this.people);
  };

  public addPerson = (req: Request, res: Response, next: NextFunction) => {
    let person = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      address: {
        street: req.body.address.street,
        city: req.body.address.city,
        state: req.body.address.state,
        zipcode: req.body.address.zipcode
      }
    };

    this.people.push(person);
    return res.send(200);
  };
}



const validatePerson = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  checkSchema({
    "firstName": {
      isString: {
        errorMessage: 'firstName has to be a string'
      },
      notEmpty: {
        errorMessage: 'firstName cannot be null or empty'
      }
    },
    "lastName": {
      isString: {
        errorMessage: 'lastName has to be a string'
      },
      notEmpty: {
        errorMessage: 'lastName cannot be null or empty'
      }
    },
    "age": {
      isNumeric: {
        errorMessage: 'age has to be numeric'
      },
      notEmpty: {
        errorMessage: 'age cannot be null or empty'
      },
      toInt: true
    },
    "address": {
      notEmpty: {
        errorMessage: 'address cannot be null or empty'
      }
    },
    "address.street": {
      notEmpty: true,
      isString: true
    },
    "address.city": {
      notEmpty: true
    }
  })

  const errors = validationResult(req);
  console.log(errors);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
}