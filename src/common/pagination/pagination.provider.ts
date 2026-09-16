import { Injectable, Inject, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core'
import type { Request } from 'express'; 
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { Paginated } from './paginater.interface';

interface PrismaModelDelegate<T> {
    findMany(args?: any): Promise<T[]>;
    count(args?: any): Promise<number>;
}

@Injectable({ scope: Scope.REQUEST })
export class PaginationProvider {
    constructor(
        @Inject(REQUEST) private readonly request: Request
    ) {}
    
    public async paginateQuery<T>(
        paginationQueryDto: PaginationQueryDto,
        model: PrismaModelDelegate<T>,
        where?: Record<string, any>,
        include?: Record<string, any>
    ): Promise<Paginated<T>> {
        const page = paginationQueryDto.page! ?? 1;
        const limit = paginationQueryDto.limit ?? 10;
        const skip = (page - 1) * limit;
        const queryOptions: any = {
            skip,
            take: limit
        };
        if(where){
            queryOptions.where = where;
        }
        if(include){
            queryOptions.include = include;
        }
        const result =  await model.findMany(queryOptions);

        const totalItems = await model.count();

        const totalPages = Math.ceil(totalItems / limit);

        const currentPage = Number(paginationQueryDto.page ?? 1);

        const nextPage = currentPage === totalPages ? currentPage : currentPage + 1;

        const prevPage = currentPage === 1 ? currentPage : currentPage - 1; 

        const baseUrl = this.request.protocol + this.request.baseUrl + '://' + this.request.headers.host + '/';

        const newUrl = new URL(this.request.url, baseUrl); 

        const response: Paginated<T>  = {
            data: result,
            meta: {
                itemsPerPage: limit,
                totalItems: totalItems,
                currentPage: page,
                totalPages: totalPages
            },
            links: {
                first: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=1`,
                last: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=${totalPages}`,
                current: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=${currentPage}`,
                next: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=${nextPage}`,
                previous: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=${prevPage}`
            }
        }

        return response;
    }
}