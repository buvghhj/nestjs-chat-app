import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserRepository } from "src/users/user.repository";
import { DatabaseModule } from "src/common/database/database.module";
import { User, UserSchema } from "src/users/entity/user.entity";
import { LocalStrategy } from "./strategies/local.strategy";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({

    providers: [

        AuthService,

        UserRepository,

        LocalStrategy,

        JwtStrategy

    ],

    exports: [

        AuthService

    ],

    controllers: [

        AuthController

    ],

    imports: [

        DatabaseModule.forFeature([

            {
                name: User.name,

                schema: UserSchema
            }

        ]),

        JwtModule.registerAsync({

            useFactory: (configService: ConfigService) => ({

                secret: configService.getOrThrow('JWT_SECRET'),

                signOptions: {

                    expiresIn: Number(configService.getOrThrow('JWT_EXPIRATION'))

                }

            }),

            inject: [ConfigService]

        })

    ]


})
export class AuthModule { }