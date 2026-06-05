import { BadRequestException, HttpException, HttpStatus, Injectable, RequestTimeoutException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dtos/create-user.dto";
import { Profile } from "../profile/profile.entity";
import { ConfigService } from "@nestjs/config";
import { error } from "console";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        private readonly configService: ConfigService,

        @InjectRepository(Profile)
        private readonly profileRepository: Repository<Profile>
    ) { }

    public async getAllUsers() {
        try {
            return await this.userRepository.find({
                relations: {
                    profile: true
                }
            })
        } catch (error) {
            if (error && typeof error === 'object' && 'code' in error && error.code === 'ECONNREFUSED') {
                throw new RequestTimeoutException('An error has occured. please try again later', {
                    description: 'Could not connect to database.'
                });
            }
            console.log(error);
        }

    }


    public async createUser(userDTO: CreateUserDto) {
        try {

            userDTO.profile = userDTO.profile ?? {};

            const existingUser = await this.userRepository.findOne({
                where: [{username: userDTO.username}, {email: userDTO.email}]
            })

            if(existingUser) {
                throw new BadRequestException('There is already a user with given username / email. ');
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