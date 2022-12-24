import {Controller, Get, Post, Put, Patch, Delete, Param, Req, Res, Body, HttpException, UseGuards} from '@nestjs/common';
import { CheckAuthGuard } from '../check-auth/check-auth.guard'
import {Request, Response} from 'express'

import { TodoListService } from './todo-list.service'
//import { TodoItemService } from './todo-item.service'

import { ListEntity } from "./list.entity";

import { UserService } from "../user/user.service";



interface IDoneItemDto{
    complited: boolean
}

interface ITodoItemDto{
    component: string,
    checked: boolean
}

interface ITodoItemDto{
    component: string,
    checked: boolean
}



@UseGuards(CheckAuthGuard)
@Controller('/api/todo/')
export class TodoListController {

    constructor(
        private todoListService: TodoListService,
        //private todoItemService: TodoItemService
        protected userService: UserService,
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

    @Post('list')
    createList(
        @Body() { title }: { title: string },
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response): any
    {
        let uid = request.cookies?.uid ?? undefined;
        let hash = request.cookies?.token ?? undefined;
        //title
        return new Promise(resolve => {
            const user = this.userService.getUser(uid)
                .then(user => {
                    if (!this.userService.isValidUser(user, hash))
                        throw new HttpException('Досуп запрещен', 403);

                    let newList = new ListEntity();
                    newList.userId = user.id;
                    newList.title = title;
                    this.todoListService.addList(newList)
                        .then(data => {
                            resolve({id: data.id});
                            //return {id: data.id}
                        })

                    //this.todoListService.
                })
        });




        //return {id: 122}
    }

}
