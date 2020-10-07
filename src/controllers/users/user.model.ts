export interface NewUser {
    firstName: string;
    lastName: string;
    age: number;
}

export interface ExistingUser extends NewUser {
    id: number;
}

export class UserModel {
    public id: number;
    public firstName: string;
    public lastName: string;
    public age: number;

    constructor() {
        // I don't particularly like this, but the tsconfig is forcing me
        // to initialize these values.  So for now, here we are.
        this.id = 0;
        this.firstName = '';
        this.lastName = '';
        this.age = 0;
    }
}