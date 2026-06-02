import { BadRequestException, Injectable, RequestTimeoutException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dtos/create-user.dto";
import { Profile } from "../profile/profile.entity";
import { ConfigService } from "@nestjs/config";

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

            let user = this.userRepository.create(userDTO);

            await this.userRepository.save(user);

        } catch (error) {
            if (error && typeof error === 'object' && 'code' in error && error.code === 'ECONNREFUSED') {
                throw new RequestTimeoutException('An error has occured. please try again later', {
                    description: 'Could not connect to database.'
                });
            }
            if(error && typeof error === 'object' && 'code' in error && error.code === '23505'){
                throw new BadRequestException('There is some dublicate value for the user in Database');
            }
        }
    }

    public async deleteUser(id: number) {
        //Delete user
        await this.userRepository.delete(id);

        //Send a response
        return { deleted: true };
    }

    public async findUserById(id: number) {
        return await this.userRepository.findOneBy({ id: id });
    }
}