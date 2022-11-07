import { Controller, Get, Post, Patch, Delete, Param, Req, Body } from '@nestjs/common';
import { Request } from 'express'

interface IDoneItemDto{
    complited: boolean
}

@Controller('todo')
export class TodoListController {

    @Get()
    getAll(): string {
        return 'Массив всех пользовательских списков дел'
    }

    @Get(':list_id')
    getList(@Param('list_id') list_id: number, @Req() request: Request): string {
        
        console.log(request?.cookies);
        return `Выбранный список дел: ${list_id}`
    }

    @Patch(':list_id/item/:item_id')
    completeTodo(
        @Param('list_id') list_id: number,
        @Param('item_id') item_id: number,
        @Body() {complited}: IDoneItemDto )
    {
        console.log(complited);
        return `Дело ${item_id} в списке ${list_id} ${complited ? 'сделано!' : 'не сделано :('}`
    }

    @Delete(':list_id/item/:item_id')
    deleteTodo(@Param('list_id') list_id: number, @Param('item_id') item_id: number)
    {
        return `Удаление дела ${item_id} из списка ${list_id}`
    }
}
