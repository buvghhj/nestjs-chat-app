import { ArgsType, Field } from "@nestjs/graphql";
import { IsArray, IsNotEmpty } from "class-validator";

@ArgsType()
export class MessageCreateArgs {

    @Field(() => [String])
    @IsArray()
    @IsNotEmpty({ each: true })
    chatIds: string[]

}