import { IsNotEmpty, IsOptional, IsString, IsInt } from "class-validator";

export class CreateTweetDto {
    @IsString()
    @IsNotEmpty()
    text!: string;

    @IsOptional()
    image?: string;

    @IsNotEmpty()
    @IsInt()
    userId!: number;
}