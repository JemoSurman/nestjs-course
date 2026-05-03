import { forwardRef, Inject } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";

export class UsersService{
    constructor(
        @Inject(forwardRef (() => AuthService))
        private readonly authService: AuthService){}

    users: {id: Number, name: string, email: string, gender: string, isMarried: boolean, password: string}[] = [
        {id: 1, name: 'John', email: 'john@gmal.com', gender: 'male', isMarried: false, password: 'test1234'},
        {id: 2, name: 'Jane', email: 'jane@gmail.com', gender: 'female', isMarried: true, password: 'test1234'},
        {id: 3, name: 'Dave', email: 'dave@gmail.com', gender: 'male', isMarried: true, password: 'test1234'},
    ]

    getAllUsers(){
        if(this.authService.isAuthenticated){
            return this.users;
        }
        return 'You are not logged-in';
    }

    getUsersById(id: Number){
        return this.users.find(x => x.id === id);
    }

    createUser(user: {id: Number, name: string, email: string, gender: string, isMarried: boolean, password: string}){
        this.users.push(user);
    }
    
}