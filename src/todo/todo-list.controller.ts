import {
    Controller,
    Get,
    Post,
    Put,
    Patch,
    Delete,
    Param,
    Body,
    Req,
    Res,
    UseGuards,
    HttpException,
    HttpStatus
} from '@nestjs/common';
import { CheckAccess } from "../check-auth/check-access";
import { CheckAuthGuard } from '../check-auth/check-auth.guard'
import { Response } from 'express'
import { IRequestWithUserAuth, ITodoListDto } from "../use/interfaces";
import { TodoListService } from './todo-list.service'
import { ListEntity } from "./list.entity";


@UseGuards(CheckAuthGuard)
@Controller('/api/todo/')
export class TodoListController extends CheckAccess{

    constructor(
        private todoListService: TodoListService
    ){
        super();
    }

    /**
     * получение массива списков
     * @param request
     */
    @Get('list')
    actionGetAllLists(@Req() request: IRequestWithUserAuth): Promise<ListEntity[]>
    {
        let uid = request?.user.id;
        return this.todoListService.findAll(uid);
    }

    /**
     * Получение конкретного списка по id
     * @param list_id
     * @param request
     */
    @Get('list/:list_id')
    async actionGetList(
        @Param('list_id') list_id: number,
        @Req() request: IRequestWithUserAuth): Promise<ListEntity>
    {
        const list = await this.todoListService.findOne(list_id);
        if (!this.hasAccess(request.user, list))
        {
            throw new HttpException('Доступ запрещен', HttpStatus.FORBIDDEN);
        }
        return list;
    }

    /**
     * Создание списка дел
     * @param title
     * @param request
     * @param response {id: number}
     */
    @Post('list')
    async actionCreateList(
        @Body() { title }: ITodoListDto,
        @Req() request: IRequestWithUserAuth,
        @Res({ passthrough: true }) response: Response): Promise<{id: number}>
    {
        if (!title)
            throw new HttpException('Заголовок списка не может быть пустым', HttpStatus.BAD_REQUEST);

        let newList = new ListEntity();
        newList.userId = request.user.id;
        newList.title = title;

        return await this.todoListService.saveList(newList)
            .then(data => {
                return {id: data.id};
            })
    }

    @Patch('list/:list_id')
    async actionChangeTitleList(
        @Param('list_id') list_id: number,
        @Body() { title }: ITodoListDto,
        @Req() request: IRequestWithUserAuth,
        @Res({ passthrough: true }) response: Response): Promise<void>
    {
        if (!title)
            throw new HttpException('Заголовок списка не может быть пустым', HttpStatus.BAD_REQUEST);

        const list = await this.todoListService.findOne(list_id);

        if (!this.hasAccess(request?.user, list))
        {
            throw new HttpException('Доступ запрещен', HttpStatus.FORBIDDEN);
        }

        list.title = title;
        response.status(HttpStatus.NO_CONTENT);
        await this.todoListService.saveList(list);
    }

    /**
     * Удаление списка
     * @param list_id
     * @param request
     * @param response
     */
    @Delete('list/:list_id')
    async actionDeleteList(
        @Param('list_id') list_id: number,
        @Req() request: IRequestWithUserAuth,
        @Res({ passthrough: true }) response: Response): Promise<any>
    {
        try {
            const list = await this.todoListService.findOne(list_id)
            if (list)
            {
                if (!this.hasAccess(request?.user, list))
                {
                    throw new HttpException('Доступ запрещен', HttpStatus.FORBIDDEN)
                }
                await this.todoListService.removeList(list);
            }
        }
        catch (err)
        {
            //Пропускаем только ошибку 404 - список не найден,
            //Все остальные бросаем дальше
            if ( !(err instanceof HttpException) || err?.getStatus() !== 404 )
            {
                throw err;
            }
        }
    }

}
