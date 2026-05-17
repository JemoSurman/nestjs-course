import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweet.dto';

@Controller('tweet')
export class TweetController {
    constructor(private readonly tweetService: TweetService){}


    // http://localhost:3000/tweet/101
    @Get(':userid')
    public GetTweets(@Param('userid', ParseIntPipe) userid: number){
        return this.tweetService.getTweets(userid);
    }


    @Post()
    public CreateTweets(@Body() tweet: CreateTweetDto){
        return this.tweetService.CreateTweet(tweet);
    }
}
