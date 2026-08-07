import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { TweetModule } from './tweet/tweet.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { HashtagModule } from './hashtag/hashtag.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import { DatabaseModule } from './database/database.module';
import { PaginationModule } from './common/pagination/pagination.module';
import envValidator from './config/env.validation'
import { APP_GUARD } from '@nestjs/core';
import { AuthorizedGuard } from './auth/guards/authorize.guard';
import { JwtModule } from '@nestjs/jwt';
import authConfig from './auth/config/auth.config';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV.trim()}`,
      load: [appConfig, databaseConfig],
      validationSchema: envValidator
    }),

    DatabaseModule,

    UserModule,
    TweetModule,
    AuthModule,
    ProfileModule,
    HashtagModule,
    PaginationModule,
    ConfigModule.forFeature(authConfig),
    JwtModule.registerAsync(authConfig.asProvider()) 
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: AuthorizedGuard
  }],
})
export class AppModule { }
