import { UserModel } from './user.model';

export class UserService {
    private users: UserModel[];
    private nextId: number = 3;

    constructor() {
        this.users = [
            {
                id: 1,
                firstName: 'Mike',
                lastName: 'Colby',
                age: 31
            },
            {
                id: 2,
                firstName: 'Abigail',
                lastName: 'Colby',
                age: 40
            },
        ];
    }

    public getUsers = () => {
        return this.users;
    }

    public getUserById = (id: number) => {
        let user = this.users.find(function (user: UserModel) {
            return id === user.id;
        })

        return user;
    }

    public saveUser = (user: UserModel) => {
        this.users.push(user);
        this.nextId++;
        return this.nextId;
    }

    public updateUser = (user: UserModel) => {
        this.deleteUser(user.id);
        this.users.push(user);
    }

    public deleteUser = (id: number) => {
        let user = this.getUserById(id);

        let users = this.users.filter(function (user) {
            return user.id !== id;
        });

        this.users = users;
        return user;
    }
}