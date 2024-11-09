import { ObjectType, Field } from '@nestjs/graphql';
import { AbstractEntity } from 'src/common/abstracts/abstract.entity';
import { Messages } from '../messages/entities/message.entity';

@ObjectType()
export class Chat extends AbstractEntity {

  @Field()
  name: string

  @Field(() => Messages, { nullable: true })
  latestMessage?: Messages

}
