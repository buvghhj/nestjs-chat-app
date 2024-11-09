import { forwardRef, Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesResolver } from './messages.resolver';
import { ChatsModule } from '../chats.module';
import { UsersModule } from 'src/users/user.module';
import { MessagesController } from './messages.controller';

@Module({

  providers: [

    MessagesResolver,

    MessagesService

  ],

  imports: [

    forwardRef(() => ChatsModule),

    UsersModule

  ],

  controllers: [MessagesController]

})
export class MessagesModule { }
