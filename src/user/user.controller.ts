import {Controller, Body, Req, Res, Post, Get, Param, HttpException, HttpStatus, UseGuards} from '@nestjs/common';
import { IRequestWithUserAuth } from "../use/interfaces";
import { CheckAuthGuard } from '../check-auth/check-auth.guard'
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { IUserDto } from "../use/interfaces";

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
    @UseGuards(CheckAuthGuard)
    actionGetUser(
        @Req() request: IRequestWithUserAuth,
        @Res({ passthrough: true }) response: Response): Promise<UserEntity>
    {
        return this.userService.getUser(request?.user.id)
            .then(user => {
                if (this.userService.isValidUser(user, request.cookies?.token))
                {
                    response
                        .cookie('uid', user.id, {maxAge: 1000 * 60 * 60 * 24 * 365})
                        .cookie('token', user.hash, {maxAge: 1000 * 60 * 60 * 24 * 365})
                    delete(user.password);
                    //user.password = undefined;
                    return user;
                }
                else
                {
                    throw new HttpException('Неверный запрос', HttpStatus.BAD_REQUEST);
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
    actionSetUser(
        @Param('uid') uid: number,
        @Param('token') token: string,
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response): Promise<UserEntity>
    {
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
                        .cookie('uid', 0, {maxAge: -1000})
                        .cookie('token', 0, {maxAge: -1000})
                    throw new HttpException('Неверный запрос', HttpStatus.BAD_REQUEST)
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
    actionCreateUser(
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
