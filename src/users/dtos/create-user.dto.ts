import { IsBoolean, IsEmail, isEmail, IsNotEmpty,  IsNumber,  IsOptional,  IsString } from "class-validator";

export class CreateUserDto {

    @IsNumber()
    id!: number;

    @IsString({message: 'Name should be a string value.'})
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsOptional()
    gender!: string;

    @IsEmail()
    email!: string;

    @IsBoolean()
    isMarried!: boolean

}