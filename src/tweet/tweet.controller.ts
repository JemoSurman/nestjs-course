import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';

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

    @Patch()
    public UpdateTweets(@Body() updatedTweet: UpdateTweetDto) {
        return this.tweetService.UpdateTweet(updatedTweet);
    }

    //DELETE: http:localhost:3000/tweet/3(id)
    @Delete(':id')
    public DeleteTweets(@Param('id', ParseIntPipe) id: number) {
        return this.tweetService.deleteTweet(id);
    }
}
