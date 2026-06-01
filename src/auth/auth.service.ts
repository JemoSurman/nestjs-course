import {forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { type ConfigType } from '@nestjs/config';
import authConfig from './config/auth.config';

@Injectable()
export class AuthService {
    constructor(
    @Inject(forwardRef (() => UsersService))
    private readonly userService: UsersService,

    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>

){}

    isAuthenticated: Boolean = false;

    login(email: string, password: string){
        console.log(this.authConfiguration);
        return 'User do not exist';
    }
}
