import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { type ConfigType } from '@nestjs/config';
import authConfig from './config/auth.config';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { HashingProvider } from './provider/hashing.provider.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/users.entity';
import { emitWarning } from 'process';
import { ActiveUserType } from './interfaces/active-user-type.interface';

@Injectable()
export class AuthService {
    constructor(
    @Inject(UsersService)
    private readonly userService: UsersService,

    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,

    private readonly hashingProvider: HashingProvider,

    private readonly jwtService: JwtService

){}

    isAuthenticated: Boolean = false;

    public async   login(loginDto: LoginDto){
        //1. FIND THE USER WITH USERNAME
        let user = await this.userService.findUserByUsername(loginDto.username);

        if (!user) {
        throw new UnauthorizedException('User not found');
    }

        //2.IF USER IS AVALIABLE, COMPARE THE PASSWORD
        let isEqual:boolean = false;

        isEqual = await this.hashingProvider.comparePassword(loginDto.password, user.password);

        if(!isEqual){
            throw new UnauthorizedException('Incorrect Password');
        }

        //3.IF THE PASSWORD MATCH, LOGIN SUCCESS - RETURN ACCESSTOKEN
        //GENERATE JWT & SEND IT IN THE RESPONSE
        return this.generateToken(user);

    }

    public async singup(createUserDto : CreateUserDto){
        return await this.userService.createUser(createUserDto );
    }

    private async signToken<T>(userId: number, expiresIn: number, payload?: T){
        return await this.jwtService.signAsync({
            sub: userId,
            ...payload
        },{
            secret: this.authConfiguration.secret,
            expiresIn: expiresIn,
            audience: this.authConfiguration.audience,
            issuer: this.authConfiguration.issuer
        });
    }

    private async generateToken(user: User){
        //GENERATE AN ACCESS TOKEN
        const accessToken = await this.signToken<Partial<ActiveUserType>>(user.id, this.authConfiguration.expiresIn, {email: user.email});

        //GENERATE A REFRESH TOKEN
        const refreshToken = await this.signToken(user.id, this.authConfiguration.refreshTokenExpiresIn);

        return { token: accessToken, refreshToken};
    }
}
