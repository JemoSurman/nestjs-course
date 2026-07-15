import {forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { type ConfigType } from '@nestjs/config';
import authConfig from './config/auth.config';
import { CreateUserDto } from '../users/dtos/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
    @Inject(UsersService)
    private readonly userService: UsersService,

    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>

){}

    isAuthenticated: Boolean = false;

    login(email: string, password: string){
        console.log(this.authConfiguration);
        return 'User do not exist';
    }

    public async singup(createUserDto : CreateUserDto){
        return await this.userService.createUser(createUserDto );
    }
}
