import { Controller, Get, Post,Body} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dtos/create-user.dto";
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