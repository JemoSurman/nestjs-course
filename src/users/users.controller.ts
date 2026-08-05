import { Controller, Get, Post,Body, Delete, Param, ParseIntPipe, Query, UseGuards} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { PaginationQueryDto } from "../common/pagination/dto/pagination-query.dto";
import { AuthorizedGuard } from "../auth/guards/authorize.guard";
@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @UseGuards(AuthorizedGuard)
    @Get()
    getUsers(@Query() pageQueryDto: PaginationQueryDto){
        return this.usersService.getAllUsers(pageQueryDto);
    }

    @UseGuards(AuthorizedGuard)
    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number){
        return this.usersService.findUserById(id);
    }

    // @Post()
    // createUsers(@Body() user: CreateUserDto){
    //     return this.usersService.createUser(user);
       
    // }

    @Delete(':id')
    public async deleteUser(@Param('id', ParseIntPipe) id: number){
        this.usersService.deleteUser(id);
    }

    
     
}