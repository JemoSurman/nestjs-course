import { Controller, Get, Delete, Param, ParseIntPipe, Query, UseGuards} from "@nestjs/common";
import { UsersService } from "./users.service";

import { PaginationQueryDto } from "../common/pagination/dto/pagination-query.dto";

@Controller('users')
// @UseGuards(AuthorizedGuard)
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @Get()
    getUsers(@Query() pageQueryDto: PaginationQueryDto){
        return this.usersService.getAllUsers(pageQueryDto);
    }

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