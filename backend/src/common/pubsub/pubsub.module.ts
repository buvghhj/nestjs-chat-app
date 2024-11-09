import { Global, Module } from "@nestjs/common";
import { PUB_SUB } from "../constant/injection-token";
import { PubSub } from "graphql-subscriptions";

@Global()
@Module({

    providers: [

        {
            provide: PUB_SUB,
            useValue: new PubSub()
        }

    ],

    exports: [PUB_SUB]

})
export class PubsubModule { }