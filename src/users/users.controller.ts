import { Controller, Get, Post } from "@nestjs/common";

@Controller('users')
export class UsersController {

    @Get()
    getUsers(){
        return 'You made a GET request to get all users';
    }

    @Post()
    createUsers(){
        return 'A new user has been created';
    }
     
}