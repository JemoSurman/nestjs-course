import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../users/users.module';
import { ConfigModule } from '@nestjs/config';
import { HashingProvider } from './provider/hashing.provider.service';
import { BcryptProvider } from './provider/bcrypt.provider.service';
import authConfig from './config/auth.config';

@Module({
  providers: [
    AuthService,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
  ],
  controllers: [AuthController],
  imports: [
    UserModule, 
    ConfigModule.forFeature(authConfig)
  ],
  exports: [
    AuthService, 
    HashingProvider,
  ],
})
export class AuthModule {}