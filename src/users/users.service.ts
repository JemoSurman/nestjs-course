import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dtos/create-user.dto";
import { Profile } from "../profile/profile.entity";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UsersService{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        private readonly configService: ConfigService,

        @InjectRepository(Profile)
        private readonly profileRepository: Repository<Profile>
    ){}

    getAllUsers(){
        const environment = this.configService.get('ENV_MODE');
        console.log(environment);
        return this.userRepository.find({
            relations: {
                profile: true 
            }
        })
    }


    public async createUser(userDTO: CreateUserDto){
        
        //Create a Profile & save
        userDTO.profile = userDTO.profile ?? {};
        //Create User Object
        let user = this.userRepository.create(userDTO);

        //Save the user object
        await this.userRepository.save(user);
    }

    public async deleteUser(id: number){
        //Delete user
        await this.userRepository.delete(id);
        
        //Send a response
        return {deleted: true};
    }

    public async findUserById(id: number) {
        return await this.userRepository.findOneBy({id: id});
    }
}