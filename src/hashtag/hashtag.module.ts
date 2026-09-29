import { Module } from '@nestjs/common';
import { HashtagController } from './hashtag.controller';
import { HashtagService } from './hashtag.service';
import { PrismaModule } from '../ prisma/prisma.module';


@Module({
  controllers: [HashtagController],
  providers: [HashtagService],
  exports: [HashtagService],
  imports: [PrismaModule]
})
export class HashtagModule {}
