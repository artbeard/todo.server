import {Controller, Body, Req, Res, Post, Get, Param, HttpException, HttpStatus, UseGuards} from '@nestjs/common';
import { IRequestWithUserAuth, IUserDto } from "../use/interfaces";
import { CheckAuthGuard } from '../check-auth/check-auth.guard'
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

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
    async actionGetUser(
        @Req() request: IRequestWithUserAuth,
        @Res({ passthrough: true }) response: Response): Promise<UserEntity>
    {
        const user = await this.userService.getUser(request?.user.id);
        if (!user || !this.userService.isValidUser(user, request.cookies?.token))
        {
            throw new HttpException('Неверный запрос', HttpStatus.BAD_REQUEST);
        }
        response
            .cookie('uid', user.id, {maxAge: 1000 * 60 * 60 * 24 * 365})
            .cookie('token', user.hash, {maxAge: 1000 * 60 * 60 * 24 * 365})
        delete(user.password);
        //user.password = undefined;
        return user;
    }

    /**
     * Установка пользователя на новом устройстве
     * @param uid
     * @param token
     * @param request
     * @param response
     */
    @Get('/:uid/:token')
    async actionSetUser(
        @Param('uid') uid: number,
        @Param('token') token: string,
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response): Promise<UserEntity>
    {
        const user = await this.userService.getUser(uid);
        if (!user || !this.userService.isValidUser(user, token))
        {
            response
                .cookie('uid', 0, {maxAge: -1000})
                .cookie('token', 0, {maxAge: -1000})
            throw new HttpException('Неверный запрос', HttpStatus.BAD_REQUEST);
        }

        response
            .cookie('uid', user.id, {maxAge: 1000 * 60 * 60 * 24 * 365})
            .cookie('token', user.hash, {maxAge: 1000 * 60 * 60 * 24 * 365})
        return user;
    }

    /**
     * Создание пользователя
     * @param name
     * @param response
     */
    @Post('make')
    async actionCreateUser(
        @Body() { name }: IUserDto,
        @Res({ passthrough: true }) response: Response): Promise<UserEntity>
    {
        if (!name)
            throw new HttpException('Неверный запрос', HttpStatus.BAD_REQUEST);
        const user = await this.userService.createNewUser({name});
        response
            .cookie('uid', user.id, {maxAge: 1000 * 60 * 60 * 24 * 365})
            .cookie('token', user.hash, {maxAge: 1000 * 60 * 60 * 24 * 365})
        return user;
    }

}
