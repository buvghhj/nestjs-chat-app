import { Field, InputType, PartialType } from "@nestjs/graphql";
import { IsString } from "class-validator";
import { RegisterInput } from "src/auth/dtos/register.input";

@InputType()
export class UpdateUserInput extends PartialType(RegisterInput) { }