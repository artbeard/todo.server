import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListEntity } from './list.entity';


@Injectable()
export class TodoListService {
    constructor(
        @InjectRepository(ListEntity)
        private listEntityRepository: Repository<ListEntity>,
    ){}

    //Поиск всех списков, принадележащих пользователю
    findAll(uid: number):Promise<ListEntity[]> 
	{	
		return this.listEntityRepository.find({
            where: {
                userId: uid,
            },
			relations: {
				items: true,
			},
		});
	}

    /**
     * Выборка одного списка
     * @param list_id
     */
    findOne(list_id: number): Promise<ListEntity> {
        return this.listEntityRepository.findOneOrFail({
            where: {
                id: list_id,
            },
			relations: {
				items: true,
			},
        })
            // .then(List => List)
            .catch(err => {
                throw new HttpException('Список не найден', HttpStatus.NOT_FOUND);
            });
	}

    /**
     * Сохранение списка в бд
     * @param new_list
     */
	saveList(new_list: ListEntity): Promise<ListEntity>
    {
        return this.listEntityRepository.save(new_list);
    }

    /**
     * Поиск и Удаление списка со всеми записями по id
     * @param listId
     */
    deleteList(listId: number): Promise<any>
    {
        return this.findOne(listId)
            .then(List => {
                return this.listEntityRepository.remove(List);
            })
    }

    /**
     * Удаление списка
     * @param list
     */
    removeList(list: ListEntity)
    {
        return this.listEntityRepository.remove(list);
    }
}
