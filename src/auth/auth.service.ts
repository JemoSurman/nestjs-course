import {forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { type ConfigType } from '@nestjs/config';
import authConfig from './config/auth.config';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { HashingProvider } from './provider/hashing.provider.service';

@Injectable()
export class AuthService {
    constructor(
    @Inject(UsersService)
    private readonly userService: UsersService,

    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,

    private readonly hashingProvider: HashingProvider

){}

    isAuthenticated: Boolean = false;

    public async login(loginDto: LoginDto){
        //1. FIND THE USER WITH USERNAME
        let user = await this.userService.findUserByUsername(loginDto.username);

        //2.IF USER IS AVALIABLE, COMPARE THE PASSWORD
        let isEqual:boolean = false;

        isEqual = await this.hashingProvider.comparePassword(loginDto.password, user.password);

        if(!isEqual){
            throw new UnauthorizedException('Incorrect Password');
        }

        //3.IF THE PASSWORD MATCH, LOGIN SUCCESS - RETURN ACCESSTOKEN


        //SEND THE RESPONSE
        return {
            data: user,
            success: true,
            message: 'User logged in Successfully'
        };
    }

    public async singup(createUserDto : CreateUserDto){
        return await this.userService.createUser(createUserDto );
    }
}
