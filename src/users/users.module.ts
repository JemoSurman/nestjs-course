import { forwardRef, Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { User } from "./users.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [TypeOrmModule.forFeature([User])]
})
export class UserModule{

}