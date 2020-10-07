import { Request, Response, Router } from 'express';
import { validationResult } from 'express-validator';

import { Controller } from '../../interfaces';

import { UserService } from './user.service';
import { UserValidator } from './user.validator';
import { UserParser } from './user.parser';

export class UserController implements Controller {
    constructor(public router = Router(),
        private userService: UserService = new UserService(),
        private userValidator: UserValidator = new UserValidator()
    ) {
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
        return res.status(200).json(users);
    }

    private getUserById = (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let id = parseInt(req.params.id);

        let user = this.userService.getUserById(id);
        return res.status(200).json(user);
    }

    private saveUser = (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // create user object
        let user = UserParser.parseRequest(req);

        // save user, retieve user id from save
        user.id = this.userService.saveUser(user);

        // return new user object
        return res.status(200).json(user);
    }

    private updateUser = (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // get updated user data
        let updatedUser = UserParser.parseRequest(req);

        // check if existing user exists
        let existingUser = this.userService.getUserById(updatedUser.id);
        if (!existingUser) {
            res.status(400).send('invalid user id');
        }

        this.userService.updateUser(updatedUser);

        return res.status(200).json(updatedUser);

    }

    private deleteUser = (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let id = parseInt(req.params.id);
        let user = this.userService.deleteUser(id);

        return res.status(200).send(user);
    }
}