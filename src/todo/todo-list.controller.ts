import { Controller, Get, Post, Put, Patch, Delete, Param, Req, Body } from '@nestjs/common';
import { Request } from 'express'

import { TodoListService } from './todo-list.service'
//import { TodoItemService } from './todo-item.service'

const crypto = require("crypto");

interface IDoneItemDto{
    complited: boolean
}

interface ITodoItemDto{
    component: string,
    checked: boolean
}

interface IUserDto{
    name: string
}

@Controller('/api/todo/')
export class TodoListController {

    constructor(
        private todoListService: TodoListService,
        //private todoItemService: TodoItemService
    ){}

    /**
     * получение массива списков
     * @param request
     */
    @Get('list')
    getAll(@Req() request: Request): any {
        let uid = request?.cookies.uid;
        return this.todoListService.findAll(uid);
    }

    /**
     * Получение конкретного списка
     * @param list_id
     * @param request
     */
    @Get('list/:list_id')
    getList(@Param('list_id') list_id: number, @Req() request: Request): any {
        return this.todoListService.findOne(list_id);
    }




    @Post('user/make')
    createUser(@Body() { name }: IUserDto ): any {

        const hasher = crypto.createHmac("sha256", Date());
        const hash = hasher.update(name).digest("hex");

        //console.log(hash);

        return {
            uid: hash
        };
    }
}
