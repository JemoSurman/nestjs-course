import { Controller, Get, Post, Param, Query, ParseIntPipe, DefaultValuePipe, Body, Patch } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.fto";

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @Get()
    getUsers(){
        return this.usersService.getAllUsers();
    }

    @Post()
    createUsers(@Body() user: CreateUserDto){
        return this.usersService.createUser(user);
       
    }
     
}