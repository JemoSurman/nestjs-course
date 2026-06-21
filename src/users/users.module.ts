import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { User } from "./users.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Profile } from "../profile/profile.entity";
import { PaginationModule } from "../common/pagination/pagination.module";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [PaginationModule,TypeOrmModule.forFeature([User, Profile]), PaginationModule]
})
export class UserModule{

}