import { forwardRef, Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { User } from "./users.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Profile } from "../profile/profile.entity";
import { PaginationModule } from "../common/pagination/pagination.module";
import { AuthModule } from "../auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import authConfig from "../auth/config/auth.config";
import { JwtModule } from "@nestjs/jwt";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [
    PaginationModule,
    TypeOrmModule.forFeature([User, Profile]), 
    PaginationModule,
    forwardRef(() => AuthModule),
    ConfigModule.forFeature(authConfig),
    JwtModule.registerAsync(authConfig.asProvider())
  ]
})
export class UserModule{

}