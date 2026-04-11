import { Controller, Get, Post } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {

    @Get()
    getUsers(){
        const usersService = new UsersService();
        return usersService.getAllUsers();
    }

    @Post()
    createUsers(){
        const user = {id: 4, name: 'anna', age: 24, gender: 'female', isMarried: false};
        const usersService = new UsersService(); 
        usersService.createUser(user);    
        return 'A new user has been created!'; 
    }
     
}