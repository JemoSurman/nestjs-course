import { forwardRef, Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { PaginationModule } from "../common/pagination/pagination.module";
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [
    PaginationModule,
    forwardRef(() => AuthModule)
  ]
})
export class UserModule{}