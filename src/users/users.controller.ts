import { Controller, Get, Post, Param } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @Get()
    getUsers(){
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