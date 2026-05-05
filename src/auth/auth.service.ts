import {forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
    @Inject(forwardRef (() => UsersService))
    private readonly userService: UsersService){}

    isAuthenticated: Boolean = false;

    login(email: string, password: string){
        return 'User do not exist';
    }
}
