import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractEntity } from 'src/common/abstracts/abstract.entity';
import { MessagesDocument } from '../messages/entities/message.document';

@Schema()
export class ChatDocument extends AbstractEntity {

    @Prop()
    userId: string

    @Prop()
    name: string

    @Prop([MessagesDocument])
    messages: MessagesDocument[]

}

export const ChatSchema = SchemaFactory.createForClass(ChatDocument)
