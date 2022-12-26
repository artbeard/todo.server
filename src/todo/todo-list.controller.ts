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
import { CheckAuthGuard } from '../check-auth/check-auth.guard'
import { Request, Response } from 'express'
import { IRequestWithUserAuth } from "../use/interfaces";
import { TodoListService } from './todo-list.service'
//import { TodoItemService } from './todo-item.service'

import { ListEntity } from "./list.entity";
import { UserService } from "../user/user.service";

import { CheckAccess } from "../check-auth/check-access";

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
export class TodoListController extends CheckAccess{

    constructor(
        private todoListService: TodoListService,
        //private todoItemService: TodoItemService
        protected userService: UserService,
    ){
        super();
    }

    /**
     * получение массива списков
     * @param request
     */
    @Get('list')
    getAll(@Req() request: IRequestWithUserAuth): any {
        let uid = request?.user.id;
        return this.todoListService.findAll(uid);
    }

    /**
     * Получение конкретного списка
     * @param list_id
     * @param request
     */
    @Get('list/:list_id')
    getList(@Param('list_id') list_id: number, @Req() request: IRequestWithUserAuth): Promise<ListEntity> {
        return this.todoListService.findOne(list_id)
            .then(List => {
                if (List?.userId !== request?.user.id)
                {
                    throw new HttpException('Доступ запрещен', HttpStatus.FORBIDDEN);
                }
                return List;
            });
    }

    @Post('list')
    async createList(
        @Body() { title }: { title: string },
        @Req() request: IRequestWithUserAuth,
        @Res({ passthrough: true }) response: Response): Promise<{id: number}>
    {
        let newList = new ListEntity();
        newList.userId = request.user.id;
        newList.title = title;
        return await this.todoListService.addList(newList)
            .then(data => {
                return {id: data.id};
            })
    }

    @Delete('list/:list_id')
    async deleteList(
        @Param('list_id') list_id: number,
        @Req() request: IRequestWithUserAuth,
        @Res({ passthrough: true }) response: Response): Promise<any>
    {
        let list = await this.todoListService.findOne(list_id)

        if (!this.hasAccess(request?.user, list))
        {
            throw new HttpException('Доступ запрещен', HttpStatus.FORBIDDEN);
        }

        return await this.todoListService.removeList(list)
            .then(()=>{
                return '';
            })
    }

}
