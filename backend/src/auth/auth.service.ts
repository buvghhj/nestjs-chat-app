import { Injectable, UnauthorizedException, UnprocessableEntityException } from "@nestjs/common";
import { RegisterInput } from "./dtos/register.input";
import { UserRepository } from "src/users/user.repository";
import * as bcrypt from 'bcrypt'
import { User } from "src/users/entity/user.entity";
import { Request, Response } from "express";
import { ConfigService } from "@nestjs/config";
import { TokenPayload } from "./interfaces/token-payload.interface";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string) {

        const user = await this.userRepository.findOne({ email })

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) {

            throw new UnauthorizedException('Credentials are not valid')

        }

        return user

    }

    async register(registerInput: RegisterInput) {

        try {

            return this.userRepository.create({

                ...registerInput,

                password: await bcrypt.hash(registerInput.password, 10)

            })

        } catch (err) {

            console.error('Error during registration:', err)

            if (err.message.includes('E11000')) {

                throw new UnprocessableEntityException('Email already exists.')

            }

            throw err

        }

    }

    async login(user: User, res: Response) {

        const expires = new Date()

        expires.setSeconds(expires.getSeconds() + this.configService.getOrThrow('JWT_EXPIRATION'))

        const tokenPayload: TokenPayload = {

            _id: user._id.toHexString(),

            email: user.email

        }

        const token = this.jwtService.sign(tokenPayload)

        res.cookie('Authentication', token, { httpOnly: true, expires })

    }

    verifyWs(req: Request): TokenPayload {

        const cookies: string[] = req.headers.cookie.split('; ')

        const authCookie = cookies.find((cookie) => cookie.includes('Authentication'))

        const jwt = authCookie.split('Authentication=')[1]

        return this.jwtService.verify(jwt)

    }

    async logout(res: Response) {

        res.cookie('Authentication', '', { httpOnly: true, expires: new Date() })

    }

}