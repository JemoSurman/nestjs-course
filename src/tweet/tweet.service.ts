import { BadRequestException, ConflictException, Injectable, NotFoundException, RequestTimeoutException} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Tweet } from '@prisma/client';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { HashtagService } from '../hashtag/hashtag.service';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { PaginationQueryDto } from '../common/pagination/dto/pagination-query.dto';
import { PaginationProvider } from '../common/pagination/pagination.provider';
import { Paginated } from '../common/pagination/paginater.interface';
import { User } from '@prisma/client';
import { Hashtag } from '@prisma/client';
import { PrismaService } from '../ prisma/prisma.service';
import { hash } from 'crypto';
import { map } from 'rxjs';


@Injectable()
export class TweetService {
    constructor(
        private readonly userService: UsersService,
        private readonly hashtagService: HashtagService,

        private readonly prisma: PrismaService,
        
        private readonly paginationProvider: PaginationProvider
        
    ) {}

    public async getTweets(userId: number, paginQueryDto: PaginationQueryDto): Promise<Paginated<Tweet>>{
        let user = await this.userService.findUserById(userId);

        if(!user){
            throw new NotFoundException(`User with ${userId} is not found!`);
        }

        return await this.paginationProvider.paginateQuery(
            paginQueryDto,
            this.prisma.tweet,
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

        const { hashtags: dtoHashtags, ...tweetData } = createTweetDto;

        try{
            return await this.prisma.tweet.create({
            data: {
                ...tweetData,
                userId,

                ...(hashtags && hashtags.length > 0 && {
                    hashtags: {
                        connect: hashtags.map((hashtag) => ({ id: hashtag.id })),
                    },
                }),
            },

            include: {
                hashtags: true
            }
        }); 
    }catch(error){
            throw new ConflictException(error);
        } 
    }

    
    
    public async UpdateTweet(updateTweetDto: UpdateTweetDto) {
        const { id, hashtags: dtoHashtags, ...tweetData } = updateTweetDto;
        //Find all hashtags
        let hashtags;
        if (dtoHashtags && dtoHashtags.length > 0) {
            hashtags = await this.hashtagService.findHashtags(dtoHashtags);
        }  
        //find tweet
        return await this.prisma.tweet.update({
            where: { id },
            data: {
                ...tweetData,
                ...(hashtags && hashtags.length > 0 && {
                    set: hashtags.map((hashtag) => ({ id: hashtag.id }))
                })
            },
            include: {
                hashtags: true,
                user: true
            }
        });
    }

    public async deleteTweet(id: number){
        await this.prisma.tweet.delete({
            where: {
                id
            }
        })

        return {delete: true, id};
    }
}
