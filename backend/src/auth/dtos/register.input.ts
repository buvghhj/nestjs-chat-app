import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

@InputType()
export class RegisterInput {

    @Field()
    @IsString()
    @IsEmail()
    email: string

    @Field()
    @IsString()
    @IsNotEmpty()
    username: string

    @Field()
    @IsStrongPassword()
    password: string

}