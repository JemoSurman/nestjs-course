import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    //http://localhost:3000/auth/login
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto : LoginDto){
        return this.authService.login(loginDto);
    }

    //http://localhost:3000/auth/signup
    @Post('signup')
    async signup(@Body() createUserDto : CreateUserDto){
        return await this.authService.singup(createUserDto);
    }
}
