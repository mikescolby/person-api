import { checkSchema } from 'express-validator';

export class UserValidator {
    userId = () => {
        return checkSchema(
            {
                id: {
                    notEmpty: {
                        errorMessage: 'user.id cannot be null or empty'
                    },
                    isNumeric: {
                        errorMessage: 'user.id must be a number'
                    },
                    toInt: true
                }
            }
        );
    }

    newUser = () => {
        return checkSchema(
            {
                firstName: {
                    notEmpty: {
                        errorMessage: 'user.firstName cannot be null or empty'
                    },
                    isString: {
                        errorMessage: 'user.firstName must be a string'
                    }
                },
                lastName: {
                    notEmpty: {
                        errorMessage: 'user.lastName cannot be null or empty'
                    },
                    isString: {
                        errorMessage: 'user.lastName must be a string'
                    }
                },
                age: {
                    notEmpty: {
                        errorMessage: 'user.age cannot be null or empty'
                    },
                    isNumeric: {
                        errorMessage: 'user.age must be a number'
                    },
                    toInt: true
                }
            }
        );
    }

    existingUser = () => {
        return [
            ...this.userId(),
            ...this.newUser()
        ];
    }
}