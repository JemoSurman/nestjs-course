import { Controller, Get, Post,Body, Delete, Param, ParseIntPipe} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dtos/create-user.dto";
@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @Get()
    getUsers(){
        return this.usersService.getAllUsers();
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number){
        return this.usersService.findUserById(id);
    }

    @Post()
    createUsers(@Body() user: CreateUserDto){
        return this.usersService.createUser(user);
       
    }

    @Delete(':id')
    public async deleteUser(@Param('id', ParseIntPipe) id: number){
        this.usersService.deleteUser(id);
    }

    
     
}