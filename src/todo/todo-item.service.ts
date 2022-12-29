import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemEntity } from './item.entity';
import { ListEntity } from "./list.entity";
import { ITodoItemDto } from '../use/interfaces'


@Injectable()
export class TodoItemService {
    constructor(
        @InjectRepository(ItemEntity)
        private itemEntityRepository: Repository<ItemEntity>,
    ){}

    /**
     * Поиск одной позиции по id
     * @param item_id
     */
    getItem(item_id: number): Promise<ItemEntity> {
        return this.itemEntityRepository.findOneOrFail({
            where: {
                id: item_id,
            },
			relations: {
				list: true,
			},
        }).catch(err => {
            throw new HttpException('Позиция не найдена', HttpStatus.NOT_FOUND);
        });
	}


    /**
     * Создание новой позиции в списке
     * @param content
     * @param position
     * @param completed
     * @param todoList
     */
	createNewTodoItem({content, position, completed}: ITodoItemDto, todoList: ListEntity): Promise<ItemEntity>
    {
        let todoItem = new ItemEntity();
        todoItem.content = content;
        todoItem.position = position ?? (todoList.items.length + 1) * 10;
        todoItem.completed = completed ?? false;
        todoItem.list = todoList;
        return this.save(todoItem)
    }

    /**
     * Сортировка всех дел в списке
     * @param todoList
     */
    sortItemsInList(todoList: ListEntity): Promise<any>
    {
        todoList.items.sort((a, b): number => {
            return a.position - b.position;
        })
        let i = 10;
        todoList.items.forEach(todo => {
            todo.position = i;
            i = i+10;
        });
        return this.saveAll(todoList.items);
    }

    /**
     * Изменение содержимого задачи
     * @param todo
     * @param content
     */
	async changeContentTodoItem(todo: ItemEntity | number, content: string): Promise<ItemEntity>
    {
        if (!(todo instanceof ItemEntity))
        {
            todo = await this.getItem(todo);
        }
        todo.content = content;
        return this.save(todo);
    }

    /**
     * Отметка о выполнении/невыполнении задачи
     * @param todo
     * @param completed
     */
    async setCompleted(todo: ItemEntity | number, completed: boolean)
    {
        if (!(todo instanceof ItemEntity))
        {
            todo = await this.getItem(todo);
        }
        todo.completed = completed;
        return this.itemEntityRepository.save(todo);
    }

    /**
     * Удаление одной задачи из списка
     * @param todo
     */
	async removeItem(todo: ItemEntity | number):Promise<void>
    {
        if (!(todo instanceof ItemEntity))
        {
            todo = await this.getItem(todo);
        }
        return this.itemEntityRepository.remove(todo)
            .then( _ => {
                return;
            });
    }

    /**
     * Сохранение одного дела
     * @param item
     */
    save(item: ItemEntity): Promise<ItemEntity>
    {
        return this.itemEntityRepository.save(item);
    }

    /**
     * Сохранение массива дел
     * todo посмотреть перегрузку функции в TS
     * @param items
     */
    saveAll(items: ItemEntity[]): Promise<ItemEntity[]>
    {
        return this.itemEntityRepository.save(items);
    }
}
