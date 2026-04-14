import { IsEmail, isEmail, IsNotEmpty,  IsOptional,  IsString } from "class-validator";

export class CreateUserDto {

    id!: number;

    @IsString({message: 'Name should be a string value.'})
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsOptional()
    gender!: string;

    @IsEmail()
    email!: string;

    isMarried!: boolean

}