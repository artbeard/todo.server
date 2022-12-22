import {Controller, Body, Req, Res, Post, Get, Param, HttpException, HttpStatus} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

interface IUserDto{
    name: string
}

@Controller('/api/user')
export class UserController {

    constructor(
        private userService: UserService
    ) {}

    /**
     * Получение параметров пользователя и обновление cookies
     * @param request
     * @param response
     */
    @Get()
    getUser(@Req() request: Request, @Res({ passthrough: true }) response: Response)
    {
        let uid = request.cookies.uid ?? undefined;
        let token = request.cookies.token ?? undefined;
        if (!uid || !token)
            throw new HttpException('Доступ запрещен', HttpStatus.FORBIDDEN);

        return this.userService.getUser(uid)
            .then(user => {
                if (this.userService.isValidUser(user, token))
                {
                    response
                        .cookie('uid', user.id, {maxAge: 1000 * 60 * 60 * 24 * 365})
                        .cookie('token', user.hash, {maxAge: 1000 * 60 * 60 * 24 * 365})
                    return user;
                }
                else
                {
                    response
                        .cookie('uid', uid, {maxAge: -1000 * 60 * 60 * 24 * 365})
                        .cookie('token', token, {maxAge: -1000 * 60 * 60 * 24 * 365})
                    return {}
                }
            })
            .catch(err => {
                throw new HttpException('Неверный запрос', HttpStatus.BAD_REQUEST)
            })
    }

    /**
     * Установка пользователя на новом устройстве
     * @param uid
     * @param token
     * @param request
     * @param response
     */
    @Get('/:uid/:token')
    setUser(
        @Param('uid') uid: number,
        @Param('token') token: string,
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response)
    {
        let cookie_uid = request.cookies.uid ?? undefined;
        let cookie_token = request.cookies.token ?? undefined;

        return this.userService.getUser(uid)
            .then(user => {
                if (this.userService.isValidUser(user, token))
                {
                    response
                        .cookie('uid', user.id, {maxAge: 1000 * 60 * 60 * 24 * 365})
                        .cookie('token', user.hash, {maxAge: 1000 * 60 * 60 * 24 * 365})
                    return user;
                }
                else
                {
                    response
                        .cookie('uid', uid, {maxAge: -1000 * 60 * 60 * 24 * 365})
                        .cookie('token', token, {maxAge: -1000 * 60 * 60 * 24 * 365})
                    return {
                        uid: undefined,
                        token: undefined
                    }
                }
            })
            .catch(err => {
                throw new HttpException('Неверный запрос', HttpStatus.BAD_REQUEST)
            })
    }

    /**
     * Создание пользователя
     * @param name
     * @param response
     */
    @Post('make')
    createUser(
        @Body() { name }: IUserDto,
        @Res({ passthrough: true }) response: Response): Promise<UserEntity>
    {
        return this.userService.createNewUser({name})
            .then(createdUser => {
                response
                    .cookie('uid', createdUser.id, {maxAge: 1000 * 60 * 60 * 24 * 365})
                    .cookie('token', createdUser.hash, {maxAge: 1000 * 60 * 60 * 24 * 365})
                return createdUser;
            });
    }

}
