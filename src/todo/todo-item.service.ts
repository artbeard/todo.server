import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemEntity } from './item.entity';

@Injectable()
export class TodoItemService {
    constructor(
        @InjectRepository(ItemEntity)
        private itemEntityRepository: Repository<ItemEntity>,
    ){}

    //не нужен
    findOne(item_id: number): Promise<ItemEntity> {
		return this.itemEntityRepository.findOne({
            where: {
                id: item_id,
            },
			relations: {
				list: true,
			},
        });
	}

	updateTodoItem(todoId: number, content: string)
    {
        return this.itemEntityRepository.findOneByOrFail({id: todoId})
            .then(todoItem => {
                todoItem.content = content;
                this.itemEntityRepository.save(todoItem);
            })
    }

    setCompleted(todoId: number, completed: boolean)
    {
        return this.itemEntityRepository.findOneByOrFail({id: todoId})
            .then(todo => {
                todo.completed = completed;
                this.itemEntityRepository.save(todo);
            })
            .catch((err) => {
                console.log('не удалось найти todo', err)
            })
    }

	removeItem(item_id: number)
    {
        return this.itemEntityRepository.findOneByOrFail({id: item_id})
            .then(todoItem => {
                this.itemEntityRepository.remove(todoItem)
            })
    }

    save(item)
    {
        return this.itemEntityRepository.save(item);
    }
}
