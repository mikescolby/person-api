import { Request } from 'express';

import { UserModel } from './user.model';

/**
 * Parses UserModel data from a variety of sources
 */
export class UserParser {
    /**
     * Parses a UserModel from ExpressJS.Request
     * @param request ExpressJS Request model
     */
    public static parseRequest = (request: Request) => {
        return UserParser.parseRequestBody(request.body);
    }

    /**
     * Parses a UserModel form ExpressJS Request.Body object
     * @param body ExpressJS Request.Body object
     */
    public static parseRequestBody = (body: any) => {
        let user = new UserModel();
        user.id = body.id;
        user.firstName = body.firstName;
        user.lastName = body.lastName;
        user.age = body.age;

        return user;
    }
}