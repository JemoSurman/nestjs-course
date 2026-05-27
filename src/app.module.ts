import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/users.module';
import { TweetModule } from './tweet/tweet.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { HashtagModule } from './hashtag/hashtag.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig } from './config/app.config';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    UserModule, 
    TweetModule, 
    AuthModule, 
    ConfigModule.forRoot({
      isGlobal: true,

      envFilePath: !ENV ? '.env' : `.env.${ENV.trim()}`,

      load: [appConfig]
    }),
    TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      synchronize: configService.get<boolean>('database.syncronize'),
      autoLoadEntities: configService.get<boolean>('database.autoLoadEntities'),
      host: configService.get<string>('database.host'),
      port: configService.get('database.port'),
      username: configService.get<string>('database.username'),
      password: configService.get<string>('database.password'),
      database: configService.get<string>('database.name')
    })
  }), ProfileModule, HashtagModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
