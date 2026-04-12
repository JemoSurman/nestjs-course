import { Controller, Get, Post, Param, Query, ParseIntPipe, ParseArrayPipe, DefaultValuePipe } from "@nestjs/common";
import { UsersService } from "./users.service";

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
    createUsers(){
        const user = {id: 4, name: 'anna', age: 24, gender: 'female', isMarried: false};
        return this.usersService.createUser(user);    
    }
     
}