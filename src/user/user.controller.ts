import {Body, Controller, Post, Get} from '@nestjs/common';
import { UserService } from "./user.service";
import {UserEntity} from "./user.entity";

interface IUserDto{
    name: string
}

@Controller('/api/user')
export class UserController {

    constructor(
        private userService: UserService
    ) {}


    @Get()
    getUser()
    {

    }

    @Post('make')
    createUser(@Body() { name }: IUserDto ): Promise<UserEntity> {
        return this.userService.createNewUser({name})
            .then(createdUser => {
                return createdUser;
            });
    }

}
