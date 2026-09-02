import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AllowAnonymous } from '../decorators/allow-anonymous.decorator';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')

export class AuthController {
    constructor(private readonly authService: AuthService){}

    //http://localhost:3000/auth/login
    @AllowAnonymous()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.OK)
    login(@Body() loginDto : LoginDto){ 
        return this.authService.login(loginDto);
    }

    //http://localhost:3000/auth/signup
    @AllowAnonymous()
    @Post('signup')
    signup(@Body() createUserDto : CreateUserDto){
        return this.authService.singup(createUserDto);
    }

    @AllowAnonymous()
    @Post('refresh-token')
    @HttpCode(HttpStatus.OK)
    public async refreshToken(@Body() refreshTokenDto: RefreshTokenDto){
        return this.authService.RefreshToken(refreshTokenDto);
    }
}
