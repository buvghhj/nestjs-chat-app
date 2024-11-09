import { Logger, Module, UnauthorizedException } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi'
import { DatabaseModule } from './common/database/database.module';
import { UsersModule } from './users/user.module';
import { LoggerModule } from 'nestjs-pino';
import { ChatsModule } from './chats/chats.module';
import { PubsubModule } from './common/pubsub/pubsub.module';
import { Request } from 'express';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({

  imports: [

    ConfigModule.forRoot({

      isGlobal: true,

      validationSchema: Joi.object({

        MONGODB_URI: Joi.string().required()

      })

    }),

    GraphQLModule.forRootAsync<ApolloDriverConfig>({

      driver: ApolloDriver,

      useFactory: (authService: AuthService) => ({

        autoSchemaFile: true,

        subscriptions: {

          'graphql-ws': {

            onConnect: (context: any) => {

              try {

                const req: Request = context.extra.request

                const user = authService.verifyWs(req)

                context.user = user

              } catch (err) {

                new Logger().error(err)

                throw new UnauthorizedException()

              }

            }

          }

        },

      }),

      imports: [AuthModule],

      inject: [AuthService]

    }),

    UsersModule,

    DatabaseModule,

    LoggerModule.forRootAsync({

      useFactory: (configService: ConfigService) => {

        const isProduction = configService.get("NODE_ENV") === 'production'

        return {

          pinoHttp: {

            transport: !isProduction
              ?
              {

                target: 'pino-pretty',

                options: {

                  singleLine: true

                }

              }
              :
              undefined,

            level: isProduction ? 'info' : 'debug'

          }

        }
      },

      inject: [ConfigService]

    }),

    ChatsModule,

    PubsubModule

  ]

})
export class AppModule { }
