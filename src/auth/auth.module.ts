import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../users/users.module';
import { ConfigModule } from '@nestjs/config';
import { HashingProvider } from './provider/hashing.provider.service';
import { BcryptProvider } from './provider/bcrypt.provider.service';
import authConfig from './config/auth.config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
  ],
  imports: [
    forwardRef(() => UserModule),
    ConfigModule.forFeature(authConfig),
    JwtModule.registerAsync(authConfig.asProvider())
  ],
  exports: [
    AuthService, 
    HashingProvider,
  ],
})
export class AuthModule {}