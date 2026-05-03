import {forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
    @Inject(forwardRef (() => UsersService))
    private readonly userService: UsersService){}

    isAuthenticated: Boolean = false;

    login(email: string, password: string){
        const user = this.userService.users.find(user => user.email === email && user.password === password)
        if(user){
            this.isAuthenticated = true;
            return 'MY_TOKEN';
            
        }
        return 'User do not exist';
    }
}
