import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { FindManyOptions, FindOptionsWhere, ObjectLiteral, Repository, FindOptionsRelations } from 'typeorm';

@Injectable()
export class PaginationProvider {
    public async paginateQuery<T extends ObjectLiteral>(
        paginationQueryDto: PaginationQueryDto,
        repository: Repository<T>,
        where?: FindOptionsWhere<T>,
        relations?: FindOptionsRelations<T>
    ) {
        const page = paginationQueryDto.page! ?? 1;
        const limit = paginationQueryDto.limit ?? 10;
        const findOptions: FindManyOptions<T> = {
            skip: (page - 1) * limit,
            take: limit
        }
        if(where){
            findOptions.where = where;
        }
        if(relations){
            findOptions.relations = relations;
        }
        const result =  await repository.find(findOptions);

        const totalItems = await repository.count();

        const totalPages = Math.ceil(totalItems / limit);

        const nextPage = page === totalPages ? page : page + 1;

        const prevPage = page === 1 ? page : page - 1; 

        const response = {
            data: result,
            meta: {
                itemsPerPage: limit,
                totalItems: totalItems,
                currentPage: page,
                totalPages: totalPages
            },
            links: {

            }
        }

        return result;
    }
}
