import {
    Controller,
    Body,
    Param,
    Req,
    HttpException,
    HttpStatus,
    Patch,
    Post,
    Delete,
    Put,
    UseGuards, Res
} from '@nestjs/common';
import { CheckAccess } from "../check-auth/check-access";
import { CheckAuthGuard } from '../check-auth/check-auth.guard'
import { Response } from "express";
import { TodoListService } from "./todo-list.service";
import { TodoItemService } from "./todo-item.service";
import { ItemEntity } from "./item.entity"
import { ITodoItemDto, IRequestWithUserAuth } from "../use/interfaces";



@UseGuards(CheckAuthGuard)
@Controller('/api/todo/item')
export class TodoController extends CheckAccess{

    constructor(
        private todoListService: TodoListService,
        private todoItemService: TodoItemService
    ){
        super();
    }

    /**
     * Создание новой позиции в списке дел
     * @param list_id
     * @param todoItemData
     * @param request
     */
    @Post('/in/:list_id')
    async createTodoItem(
        @Param('list_id') list_id: number,
        @Body() todoItemData: ITodoItemDto,
        @Req() request: IRequestWithUserAuth): Promise<{id:number}>
    {
        if (!todoItemData.content)
            throw new HttpException('Неверный запрос', HttpStatus.BAD_REQUEST);

        const list = await this.todoListService.findOne(list_id);

        if (!list)
            throw new HttpException('Неверный запрос', HttpStatus.BAD_REQUEST);

        if (!this.hasAccess(request?.user, list))
            throw new HttpException('Доступ запрещен', HttpStatus.FORBIDDEN);

        const newItem = await this.todoItemService.createNewTodoItem(todoItemData, list);

        return {id: newItem.id}
    }

    /**
     * Изменение отметки о выполнении дела
     * @param item_id
     * @param completed
     * @param request
     * @param response
     */
    @Patch('/:item_id/complete')
    async completeTodo(
        @Param('item_id') item_id: number,
        @Body() { completed }: ITodoItemDto,
        @Req() request: IRequestWithUserAuth,
        @Res({ passthrough: true }) response: Response): Promise<void>
    {
        const item = await this.todoItemService.getItem(item_id);

        if (!this.hasAccess(request?.user, item))
            throw new HttpException('Доступ запрещен', HttpStatus.FORBIDDEN);

        response.status(HttpStatus.NO_CONTENT);
        await this.todoItemService.setCompleted(item, !!completed)
    }

    /**
     * Изменение содержимого одного выбранного дела
     * @param item_id
     * @param content
     * @param request
     * @param response
     */
    @Patch('/:item_id')
    async changeContentTodoItem(
        @Param('item_id') item_id: number,
        @Body() { content }: ITodoItemDto,
        @Req() request: IRequestWithUserAuth,
        @Res({ passthrough: true }) response: Response): Promise<void>
    {
        if (!content)
            throw new HttpException('Неверный запрос', HttpStatus.BAD_REQUEST);

        const item = await this.todoItemService.getItem(item_id);

        if (!this.hasAccess(request?.user, item))
            throw new HttpException('Доступ запрещен', HttpStatus.FORBIDDEN);

        response.status(HttpStatus.NO_CONTENT);
        await this.todoItemService.changeContentTodoItem(item, content)
    }


    @Delete('/:item_id')
    async deleteTodoItem(
        @Param('item_id') item_id: number,
        @Req() request: IRequestWithUserAuth,
        @Res({ passthrough: true }) response: Response): Promise<void>
    {
        const item = await this.todoItemService.getItem(item_id);

        if (!this.hasAccess(request?.user, item))
            throw new HttpException('Доступ запрещен', HttpStatus.FORBIDDEN);

        response.status(HttpStatus.NO_CONTENT);
        return this.todoItemService.removeItem(item);
    }
}
