import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../users/users.module';
@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [forwardRef(() => UserModule)],
  exports: [AuthService]
})
export class AuthModule {}
