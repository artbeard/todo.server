import {Body, Controller, Param, HttpException, HttpStatus, Patch, Post, Delete, Put} from '@nestjs/common';
import {TodoListService} from "./todo-list.service";
import {TodoItemService} from "./todo-item.service";
import {ItemEntity} from "./item.entity"

interface IItemCreate{
    id: null | number,
    content: string,
    completed: boolean,
    position: number,
}

@Controller('/api/todo/item')
export class TodoController {

    constructor(
        private todoListService: TodoListService,
        private todoItemService: TodoItemService
    ){}



    /**
     * Создание новой позиции в списке дел
     * @param list_id
     * @param content
     * @param position
     * @param completed
     * @return Promise<{id:number}> Возвращает id созданного дела
     */
    @Post('/in/:list_id')
    createTodoItem(@Param('list_id') list_id: number, @Body() {content, position, completed}: IItemCreate): Promise<{id:number}>
    {
        return new Promise((resolve, reject) => {
            this.todoListService.findOne(list_id)
                .then((listEntity)=>{

                    let newTodoItem = new ItemEntity();
                    newTodoItem.content = content;
                    newTodoItem.position = position;
                    newTodoItem.completed = completed;
                    newTodoItem.list = listEntity;

                    this.todoItemService.save(newTodoItem)
                        .then(savedTodoItem => {
                            resolve({id: savedTodoItem.id});
                        })

                })
                .catch((err)=>{
                    //throw new Error('не удалось создать новое дело');
                    reject(err);
                })
        })
    }


    @Patch('/:item_id/complete')
    completeTodo(@Param('item_id') item_id: number, @Body() { completed }: IItemCreate )
    {
        return new Promise((resolve, reject) => {
            this.todoItemService.setCompleted(item_id, completed)
                .then((res)=>{
                    resolve(res);
                })
                .catch(()=>{
                    throw new HttpException('Не удалось изменить состояние', HttpStatus.BAD_REQUEST);
                });
        })

    }

    @Put('/:item_id')
    updateTodoItem(@Param('item_id') item_id: number, @Body() { content }: {content: string})
    {
        this.todoItemService.updateTodoItem(item_id, content)
            .then(()=>{

            })
            .catch(err => {
                throw new HttpException('Не удалось обновить todo', HttpStatus.BAD_REQUEST);
            })
    }

    @Delete('/:item_id')
    deleteTodoItem(@Param('item_id') item_id: number)
    {
        this.todoItemService.removeItem(item_id)
            .then(()=>{})
            .catch(err => {
                throw new HttpException('Не удалось удалить todo', HttpStatus.BAD_REQUEST);
            })
    }
}
