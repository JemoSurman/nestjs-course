import { Controller, Get, Post, Param, Query, ParseIntPipe, ValidationPipe, DefaultValuePipe, Body } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dtos/create-user.dto";

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @Get()
    getUsers(
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number, 
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number
    )
    {
        
        return this.usersService.getAllUsers();
    }

    @Get(':id')
    getUsersById(@Param('id', ParseIntPipe) id: number){
        console.log(typeof id, id);
        return this.usersService.getUsersById(id);
    }

    @Post()
    createUsers(@Body(new ValidationPipe()) user: CreateUserDto){
        return 'A new user has been created';
    }
     
}