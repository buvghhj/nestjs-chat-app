import { Controller, Post, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { CurrentUser } from "src/common/middlewares/current-user.decorator";
import { User } from "src/users/entity/user.entity";
import { Response } from "express";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(
        @CurrentUser() user: User,
        @Res({ passthrough: true }) res: Response
    ) {

        return await this.authService.login(user, res)

    }

    @Post('/logout')
    async logout(@Res({ passthrough: true }) res: Response) {

        return await this.authService.logout(res)

    }

}