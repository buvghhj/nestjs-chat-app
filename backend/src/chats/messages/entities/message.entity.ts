import { Field, ObjectType } from "@nestjs/graphql";
import { AbstractEntity } from "src/common/abstracts/abstract.entity";
import { User } from "src/users/entity/user.entity";

@ObjectType()
export class Messages extends AbstractEntity {

    @Field()
    content: string

    @Field()
    createdAt: Date

    @Field(() => User)
    user: User

    @Field()
    chatId: string

}