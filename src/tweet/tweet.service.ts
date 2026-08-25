import { BadRequestException, ConflictException, Injectable, NotFoundException, RequestTimeoutException} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { Tweet } from './tweet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { HashtagService } from '../hashtag/hashtag.service';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { PaginationQueryDto } from '../common/pagination/dto/pagination-query.dto';
import { PaginationProvider } from '../common/pagination/pagination.provider';
import { Paginated } from '../common/pagination/paginater.interface';
import { ActiveUserType } from '../auth/interfaces/active-user-type.interface';
import { User } from '../users/users.entity';
import { Hashtag } from '../hashtag/hashtag.entity';


@Injectable()
export class TweetService {
    constructor(
        private readonly userService: UsersService,
        private readonly hashtagService: HashtagService,
        
        @InjectRepository(Tweet) private readonly tweetRepository: Repository<Tweet>,

        private readonly paginationProvider: PaginationProvider
        
    ) {}

    public async getTweets(userId: number, paginQueryDto: PaginationQueryDto): Promise<Paginated<Tweet>>{
        let user = await this.userService.findUserById(userId);

        if(!user){
            throw new NotFoundException(`User with ${userId} is not found!`);
        }

        return await this.paginationProvider.paginateQuery(
            paginQueryDto,
            this.tweetRepository,
            { user: { id: userId }},
            {
                user: true,
                hashtags: true
            }
        )
    }

    public async CreateTweet(createTweetDto : CreateTweetDto, userId: number){
        let user: User | undefined = undefined;
        let hashtags: Hashtag[] | undefined = undefined;
        try {
             //Find user with the given userid from user table
            user = await this.userService.findUserById(userId);

            //Fetch all the hashtags based on hashtag array
            if(createTweetDto.hashtags){
                hashtags = await this.hashtagService.findHashtags(createTweetDto.hashtags)
            }
            
        } catch (error) {
            throw new RequestTimeoutException();
        }
        if(createTweetDto.hashtags?.length !== hashtags?.length){
            throw new BadRequestException();
        }
       
        
        //Create a tweet
        if(!user){
            return 'user not exist';
        }
        let tweet = this.tweetRepository.create({...createTweetDto, user: user, hashtags: hashtags});
        
       
        try{
            //Save the tweet  
            return await this.tweetRepository.save(tweet);  
        }catch(error){
            throw new ConflictException(error);
        }
    }

    
    public async UpdateTweet(updateTweetDto: UpdateTweetDto) {
        //Find all hashtags
        let hashtags;
        if(updateTweetDto.hashtags){
            hashtags = await this.hashtagService.findHashtags(updateTweetDto.hashtags);
        }
        //find tweet
        let tweet = await this.tweetRepository.findOneBy({
            id: updateTweetDto.id
        });

        //update properties of the tweet
        if(tweet){
            tweet.text = updateTweetDto.text ?? tweet.text;
            tweet.image = updateTweetDto.image ?? tweet.image;
            tweet.hashtags = hashtags;
        }
        
        //Save the tweet
        if(tweet)
        return await this.tweetRepository.save(tweet);
        
    }

    public async deleteTweet(id: number){
        await this.tweetRepository.delete({
            id: id
        })

        return {delete: true, id};
    }
}
