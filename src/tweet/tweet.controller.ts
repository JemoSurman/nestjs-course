import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { PaginationQueryDto } from '../common/pagination/dto/pagination-query.dto';
import { ActiveUser } from '../decorators/active-user.decorator';

@Controller('tweet')
export class TweetController {
    constructor(private readonly tweetService: TweetService){}


    // http://localhost:3000/tweet/101?limit=10&page=3
    @Get(':userid')
    public GetTweets(
        @Param('userid', ParseIntPipe) userid: number,
        @Query() paginationQueryDto: PaginationQueryDto
    ){
        return this.tweetService.getTweets(userid, paginationQueryDto);
    }


    @Post()
    public CreateTweets(@Body() tweet: CreateTweetDto, @ActiveUser('sub') user){
        return this.tweetService.CreateTweet(tweet, user);
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
