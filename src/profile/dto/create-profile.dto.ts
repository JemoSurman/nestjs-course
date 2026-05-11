import { IsDate, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateProfileDto {
    @IsString()
    @IsOptional()
    @MaxLength(100)
    @MinLength(3, { message: 'First Name should have a minimum of 3 charachters.' })
    firstName?: string;

    @IsString({ message: 'Last Name should be a string value.' })
    @IsOptional()
    @MaxLength(100)
    @MinLength(3, { message: 'Last Name should have a minimum of 3 charachters.' })
    lastName?: string;

    @IsString()
    @IsOptional()
    @MaxLength(10)
    gender?: string;

    @IsDate()
    @IsOptional()
    dateOfBirth?: Date;

    @IsOptional()
    @IsString()
    bio?:string;

    @IsOptional()
    @IsString()
    profileImage?: string;
} 