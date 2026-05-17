import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { Tweet } from './tweet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTweetDto } from './dto/create-tweet.dto';

@Injectable()
export class TweetService {
    constructor(
        private readonly userService: UsersService,
        @InjectRepository(Tweet) private readonly tweetRepository: Repository<Tweet>
        
    ) {}

    public async getTweets(userId: number){
        return await this.tweetRepository.find({
            where: {user: {id: userId}},
            relations: { user: true }
        })
    }

    public async CreateTweet(createTweetDto : CreateTweetDto){
        //Find user with the given userid from user table
        let user = await this.userService.findUserById(createTweetDto.userId);

        //Create a tweet
        if(!user){
            return 'user not exist';
        }
        let tweet = this.tweetRepository.create({...createTweetDto, user: user});
        
        //Save the tweet  
        
        await this.tweetRepository.save(tweet);  
    }
}
