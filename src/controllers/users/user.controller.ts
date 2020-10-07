import * as express from 'express';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { Controller } from '../controller.interface';
import { UserModel } from './user.model';
import { UserService } from './user.service';
import { UserValidator } from './user.validator';

export class UserController implements Controller {
    public router = express.Router();

    private userService: UserService = new UserService();
    private userValidator: UserValidator = new UserValidator();

    constructor() {
        this.initRoutes();
    }

    public initRoutes = () => {
        this.router.get("/api/v1/users", this.getUsers);
        this.router.get("/api/v1/users/:id", this.userValidator.userId(), this.getUserById);
        this.router.post("/api/v1/users", this.userValidator.newUser(), this.saveUser);
        this.router.put("/api/v1/users", this.userValidator.existingUser(), this.updateUser);
        this.router.delete("/api/v1/users/:id", this.userValidator.userId(), this.deleteUser);
    };

    private getUsers = (req: Request, res: Response) => {
        let users = this.userService.getUsers();
        res.status(200).json(users);
    }

    private getUserById = (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }

        let id = parseInt(req.params.id);

        let user = this.userService.getUserById(id);
        res.status(200).json(user);
    }

    private saveUser = (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }

        // create user object
        let user = new UserModel();
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.age = req.body.age;

        // save user, retieve user id from save
        user.id = this.userService.saveUser(user);

        // return new user object
        res.status(200).json(user);
    }

    private updateUser = (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }

        // get updated user data
        let updatedUser = new UserModel();
        updatedUser.id = req.body.id;
        updatedUser.firstName = req.body.firstName;
        updatedUser.lastName = req.body.lastName;
        updatedUser.age = req.body.age;

        // check if existing user exists
        let existingUser = this.userService.getUserById(updatedUser.id);
        if (!existingUser) {
            res.status(400).send('invalid user id');
        }

        this.userService.updateUser(updatedUser);

        res.status(200).json(updatedUser);

    }

    private deleteUser = (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }

        let id = parseInt(req.params.id);
        let user = this.userService.deleteUser(id);

        res.status(200).send(user);
    }
}