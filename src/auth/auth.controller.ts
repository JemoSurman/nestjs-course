import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post()
    login(@Body() user: {email: string, password: string}){
        return this.authService.login(user.email, user.password);
    }

    //http://localhost:3000/auth/signup
    @Post('signup')
    async  signup(@Body() createUserDto : CreateUserDto){
        return await this.authService.singup(createUserDto);
    }
}
