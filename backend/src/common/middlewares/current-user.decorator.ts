import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlContextType, GqlExecutionContext } from "@nestjs/graphql";
import { User } from "src/users/entity/user.entity";

const getCurrentUserByContext = (ctx: ExecutionContext): User => {

    if (ctx.getType() === 'http') {

        return ctx.switchToHttp().getRequest().user

    } else if (ctx.getType<GqlContextType>() === 'graphql') {

        return GqlExecutionContext.create(ctx).getContext().req.user

    }

}

export const CurrentUser = createParamDecorator(

    (_data: unknown, ctx: ExecutionContext) => getCurrentUserByContext(ctx)

)