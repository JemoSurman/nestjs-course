import { Controller, Get, Post, Param, Query } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @Get()
    getUsers(@Query() query: any){
        if(query.gender && query.age){
            return this.usersService.users.filter(user => user.gender === query.gender && user.age === +query.age);
        }
        if(query.gender){
            return this.usersService.users.filter(user => user.gender === query.gender);
        }
        return this.usersService.getAllUsers();
    }

    @Get(':id')
    getUsersById(@Param('id') id: any){
        return this.usersService.getUsersById(+id);
    }

    @Post()
    createUsers(){
        const user = {id: 4, name: 'anna', age: 24, gender: 'female', isMarried: false};
        return this.usersService.createUser(user);    
        return 'A new user has been created!'; 
    }
     
}