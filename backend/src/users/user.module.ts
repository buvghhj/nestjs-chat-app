import { Module } from "@nestjs/common";
import { UsersResolver } from "./user.resolver";
import { UsersService } from "./user.service";
import { AuthModule } from "src/auth/auth.module";
import { UserRepository } from "./user.repository";
import { DatabaseModule } from "src/common/database/database.module";
import { User, UserSchema } from "./entity/user.entity";

@Module({

    providers: [

        UsersResolver,

        UsersService,

        UserRepository

    ],

    imports: [

        AuthModule,

        DatabaseModule.forFeature([

            {
                name: User.name,

                schema: UserSchema
            }

        ])

    ],

    exports: [

        UserRepository,

        UsersService

    ]

})
export class UsersModule { }