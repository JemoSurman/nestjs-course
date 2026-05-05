import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dtos/create-user.dto";

@Injectable()
export class UsersService{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    getAllUsers(){
        return this.userRepository.find()
    }


    public async createUser(userDTO: CreateUserDto){
        //Validate if a user exist with the given email
        const user = await this.userRepository.findOne({
            where: { email: userDTO.email }
        })

        //Handle the error / exception
        if(user){
            return 'The user with the given email already exists!';
        }

        //creating that user
        let newUser = this.userRepository.create(userDTO);
        newUser = await this.userRepository.save(newUser);
        
        return newUser;
    }
}