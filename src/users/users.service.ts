import { HttpException, HttpStatus, Injectable, InternalServerErrorException, RequestTimeoutException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UserAlreadyExistsException } from "../CustomExceptions/user-already-exist.exception";
import { PaginationProvider } from "../common/pagination/pagination.provider";
import { PaginationQueryDto } from "../common/pagination/dto/pagination-query.dto"; 
import { Paginated } from "../common/pagination/paginater.interface";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        private readonly paginationProvider: PaginationProvider,
        
    ) { }

    public async getAllUsers(paginatationQueryDto: PaginationQueryDto): Promise<Paginated<User>> {
        try {
            return await this.paginationProvider.paginateQuery(
                paginatationQueryDto,
                this.userRepository,
                {},
                { profile: true }
            )
        } catch (error) {
            if (error && typeof error === 'object' && 'code' in error && error.code === 'ECONNREFUSED') {
                throw new RequestTimeoutException('An error has occured. please try again later', {
                    description: 'Could not connect to database.'
                });
            }
            
            throw new InternalServerErrorException('Something went wrong fetching users.');
        }

    }


    public async createUser(userDTO: CreateUserDto) {
        try {

            userDTO.profile = userDTO.profile ?? {};

            const existingUserWithUsername = await this.userRepository.findOne({
                where: {username: userDTO.username}
            })

            if(existingUserWithUsername) {
                throw new UserAlreadyExistsException('username', userDTO.username);
            }

            const existingUserWithEmail = await this.userRepository.findOne({
                where: {email: userDTO.email}
            })

            if(existingUserWithEmail) {
                throw new UserAlreadyExistsException('email', userDTO.email);
            }

            let user = this.userRepository.create(userDTO);

            await this.userRepository.save(user);
            return user;

        } catch (error) {
            if (error && typeof error === 'object' && 'code' in error && error.code === 'ECONNREFUSED') {
                throw new RequestTimeoutException('An error has occured. please try again later', {
                    description: 'Could not connect to database.'
                });
            }

            throw error;
            
        }
    }

    public async deleteUser(id: number) {
        //Delete user
        await this.userRepository.delete(id);

        //Send a response
        return { deleted: true };
    }

    public async findUserById(id: number) {
        const user =   await this.userRepository.findOneBy({ id: id });

        if(!user){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'The user with ID ' + id + ' was not found.',
                table: user
            }, HttpStatus.NOT_FOUND, {
                description: 'The exception occured a user with ID ' + id + ' was not in users table.'
            });
        }

        return user;
    }
}