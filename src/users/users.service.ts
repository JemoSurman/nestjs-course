import { forwardRef, HttpException, HttpStatus, Inject, Injectable, InternalServerErrorException, RequestTimeoutException, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UserAlreadyExistsException } from "../CustomExceptions/user-already-exist.exception";
import { PaginationProvider } from "../common/pagination/pagination.provider";
import { PaginationQueryDto } from "../common/pagination/dto/pagination-query.dto"; 
import { Paginated } from "../common/pagination/paginater.interface";
import { HashingProvider } from "../auth/provider/hashing.provider.service";
import { PrismaService } from "../ prisma/prisma.service";
import { profile } from "console";
import { User } from "@prisma/client"

@Injectable()
export class UsersService {
    constructor(
        private readonly prisma: PrismaService,

        private readonly paginationProvider: PaginationProvider,


        @Inject(forwardRef( () => HashingProvider))
        private readonly hashingProvider: HashingProvider
        
    ) {}

    public async getAllUsers(paginatationQueryDto: PaginationQueryDto): Promise<Paginated<User>> {
        try {
            return await this.paginationProvider.paginateQuery(
                paginatationQueryDto,
                this.prisma.user,
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

            const existingUserWithUsername = await this.prisma.user.findUnique({
                where: {username: userDTO.username}
            })

            if(existingUserWithUsername) {
                throw new UserAlreadyExistsException('username', userDTO.username);
            }

            const existingUserWithEmail = await this.prisma.user.findUnique({
                where: {email: userDTO.email}
            })

            if(existingUserWithEmail) {
                throw new UserAlreadyExistsException('email', userDTO.email);
            }

            const hashedPassword = await this.hashingProvider.hashPassword(userDTO.password);

            const user = await this.prisma.user.create({
                data: {
                    ...userDTO,
                    password: hashedPassword,
                    ...(profile && {
                        profile: {
                            create: profile
                        },
                    }),
                },
                
                include: {
                    profile: true
                }
            });
            
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
        await this.prisma.user.delete({
            where: {
                id: id
            }
        });

        //Send a response
        return { deleted: true };
    }

    public async findUserById(id: number) {
        const user =   await this.prisma.user.findUnique({
            where: {
                id: id
            }
        });

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

    public async findUserByUsername(username: string){
        let user: User | null = null;

        try{
            user = await this.prisma.user.findUnique({
                where: {
                    username: username
                }
            })
        }catch(error){
            throw new RequestTimeoutException(error, {
                description: 'User with given username could not be found'
            });
        }
        if(!user){
            throw new UnauthorizedException('User does not exist!');
        }

        return user;

    }
}