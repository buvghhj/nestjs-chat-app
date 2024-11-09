import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { Messages } from './entities/message.entity';
import { Inject, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CreateMessageInput } from './dtos/create-message.input';
import { CurrentUser } from 'src/common/middlewares/current-user.decorator';
import { TokenPayload } from 'src/auth/interfaces/token-payload.interface';
import { GetMessageArgs } from './dtos/get-messages.args';
import { MessageCreateArgs } from './dtos/message-created.args';

@Resolver(() => Messages)
export class MessagesResolver {

  constructor(
    private readonly messagesService: MessagesService,
  ) { }

  @Mutation(() => Messages)
  @UseGuards(GqlAuthGuard)
  async createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
    @CurrentUser() user: TokenPayload
  ): Promise<Messages> {

    return this.messagesService.createMessage(createMessageInput, user._id)

  }

  @Query(() => [Messages], { name: 'messages' })
  @UseGuards(GqlAuthGuard)
  async getMessages(
    @Args() getMessageArgs: GetMessageArgs,
  ): Promise<Messages[]> {

    return this.messagesService.getMessages(getMessageArgs)

  }

  @Subscription(() => Messages, {
    filter: (payload, variables: MessageCreateArgs, context) => {

      const userId = context.req.user._id
      const message: Messages = payload.messageCreated

      return (
        variables.chatIds.includes(message.chatId) &&
        userId !== message.user._id.toHexString()
      )

    }
  })
  messageCreated(
    @Args() _messageCreatedArgs: MessageCreateArgs,
  ) {

    return this.messagesService.messageCreated()

  }

}
