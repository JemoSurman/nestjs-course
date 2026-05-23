import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/users.module';
import { TweetModule } from './tweet/tweet.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/users.entity';
import { ProfileModule } from './profile/profile.module';
import { HashtagModule } from './hashtag/hashtag.module';

@Module({
  imports: [UserModule, TweetModule, AuthModule, TypeOrmModule.forRootAsync({
    imports: [],
    inject: [],
    useFactory: () => ({
      type: 'postgres',
      // entities: [User],
      synchronize: true,
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin1234',
      autoLoadEntities: true,
      database: 'nestjs'
    })
  }), ProfileModule, HashtagModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
