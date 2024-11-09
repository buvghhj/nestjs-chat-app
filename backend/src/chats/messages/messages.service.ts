import { Inject, Injectable } from '@nestjs/common';
import { CreateMessageInput } from './dtos/create-message.input';
import { ChatsRepository } from '../chats.repository';
import { Types } from 'mongoose';
import { GetMessageArgs } from './dtos/get-messages.args';
import { PUB_SUB } from 'src/common/constant/injection-token';
import { PubSub } from 'graphql-subscriptions';
import { MESSAGE_CREATED } from './constant/pubsub-trigger';
import { MessageCreateArgs } from './dtos/message-created.args';
import { MessagesDocument } from './entities/message.document';
import { Messages } from './entities/message.entity';
import { UsersService } from 'src/users/user.service';

@Injectable()
export class MessagesService {

    constructor(
        private readonly chatsRepository: ChatsRepository,
        private readonly userService: UsersService,
        @Inject(PUB_SUB) private readonly pubSub: PubSub
    ) { }

    async createMessage({ content, chatId }: CreateMessageInput, userId: string) {

        const messageDocument: MessagesDocument = {
            content,
            userId: new Types.ObjectId(userId),
            createdAt: new Date(),
            _id: new Types.ObjectId()
        }

        await this.chatsRepository.findOneAndUpdate(
            {

                _id: chatId,

            },
            {
                $push: { messages: messageDocument }
            }
        )

        const message: Messages = {

            ...messageDocument,
            chatId,
            user: await this.userService.findOne(userId)

        }

        await this.pubSub.publish(MESSAGE_CREATED, { messageCreated: message })

        return message

    }

    async getMessages({ chatId, skip, limit }: GetMessageArgs) {

        return this.chatsRepository.model.aggregate([

            { $match: { _id: new Types.ObjectId(chatId) } },

            { $unwind: '$messages' },

            { $replaceRoot: { newRoot: '$messages' } },

            { $sort: { createdAt: -1 } },

            { $skip: skip },

            { $limit: limit },

            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },

            { $unwind: '$user' },

            { $unset: 'userId' },

            { $set: { chatId } }

        ])
    }

    async messageCreated() {

        return this.pubSub.asyncIterator(MESSAGE_CREATED)

    }

    async countMessages(chatId: string) {

        return (
            await this.chatsRepository.model.aggregate([

                { $match: { _id: new Types.ObjectId(chatId) } },

                { $unwind: '$messages' },

                { $count: 'messages' }

            ])
        )[0]

    }

}
