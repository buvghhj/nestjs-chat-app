import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UsersService } from "./user.service";
import { AuthService } from "src/auth/auth.service";
import { RegisterInput } from "src/auth/dtos/register.input";
import { User } from "./entity/user.entity";
import { UpdateUserInput } from "./dtos/update-user.input";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guard";
import { CurrentUser } from "src/common/middlewares/current-user.decorator";
import { TokenPayload } from "src/auth/interfaces/token-payload.interface";

@Resolver(() => User)
export class UsersResolver {

    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService
    ) { }

    @Mutation(() => User)
    async register(@Args('registerInput') registerInput: RegisterInput) {

        return await this.authService.register(registerInput)

    }

    @Query(() => [User], { name: 'getAllUsers' })
    @UseGuards(GqlAuthGuard)
    async findAllUsers() {

        return await this.usersService.findAll()

    }

    @Query(() => User, { name: 'getUserById' })
    @UseGuards(GqlAuthGuard)
    async findOneUser(@Args('id') id: string) {

        return await this.usersService.findOne(id)

    }

    @Mutation(() => User, { name: 'updateUser' })
    @UseGuards(GqlAuthGuard)
    async updateUser(
        @CurrentUser() user: TokenPayload,
        @Args('updateUserInput') updateUserInput: UpdateUserInput
    ) {

        return await this.usersService.updateUser(user._id, updateUserInput)

    }

    @Mutation(() => User, { name: 'deleteUser' })
    @UseGuards(GqlAuthGuard)
    async deleteUser(
        @CurrentUser() user: TokenPayload
    ) {

        return await this.usersService.deleteUser(user._id)

    }

    @Query(() => User, { name: 'me' })
    @UseGuards(GqlAuthGuard)
    async getMe(@CurrentUser() user: TokenPayload) {

        return user

    }

}