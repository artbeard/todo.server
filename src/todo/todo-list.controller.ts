import { Controller, Get, Post, Put, Patch, Delete, Param, Req, Body } from '@nestjs/common';
import { Request } from 'express'

import { TodoListService } from './todo-list.service'

interface IDoneItemDto{
    complited: boolean
}

interface ITodoItemDto{
    component: string,
    checked: boolean
}

@Controller('todo')
export class TodoListController {

    constructor(
        private todoListService: TodoListService
    ){}

    @Get()
    getAll(@Req() request: Request): any {
        let uid = request?.cookies.uid;
        //return `Массив всех пользовательских списков дел ${uid}`;
        return this.todoListService.findAll(uid);
    }

    @Get(':list_id')
    getList(@Param('list_id') list_id: number, @Req() request: Request): any {
        //request?.cookies.uid
        return this.todoListService.findOne(list_id);
    }

    
    @Patch(':list_id/item/:item_id')
    completeTodo(
        @Param('list_id') list_id: number,
        @Param('item_id') item_id: number,
        @Body() {complited}: IDoneItemDto )
    {
        return `Дело ${item_id} в списке ${list_id} ${complited ? 'сделано!' : 'не сделано :('}`
    }

    @Put(':list_id/item/:item_id')
    updateTodo(
        @Param('list_id') list_id: number,
        @Param('item_id') item_id: number,
        @Body() todoItemDto: ITodoItemDto )
    {
        return `Дело ${item_id} в списке ${list_id} изменено ${JSON.stringify(todoItemDto, null, 4)}`
    }

    @Delete(':list_id/item/:item_id')
    deleteTodo(@Param('list_id') list_id: number, @Param('item_id') item_id: number)
    {
        return `Удаление дела ${item_id} из списка ${list_id}`
    }
}
