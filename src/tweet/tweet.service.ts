import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class TweetService {
    constructor(private readonly userService: UsersService){}

    tweets: {text: String, date: Date, userId: Number}[] = [
        {text: "some tweets", date: new Date('2026-10-11'), userId: 1},
        {text: "some other tweets", date: new Date('2026-08-10'), userId: 1},
        {text: "some more tweets", date: new Date('2026-12-09'), userId: 3}
    ];

    getTweets(userId: Number){
        const user = this.userService.getUsersById(userId);
        if(!user){
            console.error("User not found");
            return [];
        }

        const tweets =  this.tweets.filter(tweet => tweet.userId == userId);
        const response = this.tweets.map( t => { return {text: t.text, date: t.date, name: user.name}});

        return response;
    }
}
