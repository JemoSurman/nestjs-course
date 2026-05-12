import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dtos/create-user.dto";
import { Profile } from "../profile/profile.entity";

@Injectable()
export class UsersService{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(Profile)
        private readonly profileRepository: Repository<Profile>
    ){}

    getAllUsers(){
        return this.userRepository.find()
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
        //Find the user with given id
        let user = await this.userRepository.findOneBy({id});
        //Delete user
        await this.userRepository.delete(id);
        //Delete profile
        if(user?.profile){
            await this.profileRepository.delete(user.profile.id);
        }
        //Send a response
        return {deleted: true};
    }
}