import { Module } from '@nestjs/common';
import { TweetController } from './tweet.controller';
import { TweetService } from './tweet.service';
import { UserModule } from '../users/users.module';
import { HashtagModule } from '../hashtag/hashtag.module';
import { PaginationModule } from '../common/pagination/pagination.module';
import { PrismaModule } from '../ prisma/prisma.module';

@Module({
  controllers: [TweetController],
  providers: [TweetService],
  imports: [
    UserModule, 
    PrismaModule,
    HashtagModule, 
    PaginationModule
  ]
})
export class TweetModule {}
