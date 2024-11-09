import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { UpdateUserInput } from "./dtos/update-user.input";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {

    constructor(private readonly usersRepository: UserRepository) { }

    async findAll() {

        return await this.usersRepository.find({})

    }

    async findOne(id: string) {

        try {

            return await this.usersRepository.findOne({ _id: id })

        } catch (error) {

            throw error

        }

    }

    async updateUser(id: string, updateUserInput: UpdateUserInput) {

        try {

            if (updateUserInput.password) {

                updateUserInput.password = await bcrypt.hash(updateUserInput.password, 10)

            }

            return await this.usersRepository.findOneAndUpdate(
                {
                    _id: id
                },
                {
                    $set: {
                        ...updateUserInput
                    }

                })

        } catch (error) {

            throw error

        }

    }

    async deleteUser(id: string) {

        try {

            return await this.usersRepository.findOneAndDelete({ _id: id })

        } catch (error) {

            throw error

        }

    }

}