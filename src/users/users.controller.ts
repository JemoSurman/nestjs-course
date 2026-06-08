import { Controller, Get, Post,Body, Delete, Param, ParseIntPipe, Query} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { PaginationQueryDto } from "../common/pagination/dto/pagination-query.dto";
@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @Get()
    getUsers(@Query() paginationQueryDto: PaginationQueryDto){
        return this.usersService.getAllUsers(paginationQueryDto);
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