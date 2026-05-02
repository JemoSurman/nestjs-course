import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TweetService } from './tweet.service';

@Controller('tweet')
export class TweetController {
    constructor(private readonly tweetService: TweetService){}


    // http://localhost:3000/tweet/101
    @Get(':userid')
    public GetTweets(@Param('userid', ParseIntPipe) userid: Number){
        return this.tweetService.getTweets(userid);
    }
}
