import { Prop, Schema } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { AbstractEntity } from "src/common/abstracts/abstract.entity";

@Schema()
export class MessagesDocument extends AbstractEntity {

    @Prop()
    content: string

    @Prop()
    createdAt: Date

    @Prop()
    userId: Types.ObjectId

}