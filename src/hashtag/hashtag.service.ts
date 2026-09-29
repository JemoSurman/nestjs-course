import { Injectable, Body } from '@nestjs/common';
import { CreateHashtagDto } from './dto/create-hashtag.dto';
import { PrismaService } from '../ prisma/prisma.service';

@Injectable()
export class HashtagService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    public async createHashtag(@Body() createHashtagDto: CreateHashtagDto) {
        return await this.prisma.hashtag.create({
            data: {
                ...createHashtagDto
            }
        })
    }

    public async findHashtags(hashtags: number[]) {
        return await this.prisma.hashtag.findMany({
            where: {
                id
            }
        })
    }

    public async deleteHashtag(id: number) {
        await this.prisma.hashtag.delete({
            where: {
                id: id
            }
        })

        return {deleted: true, id};
    }

    public async softdeleteHashtag(id: number) {
        await this.hashtagRepository.softDelete({
            id: id
        })

        return {deleted: true, id};
    }
}
