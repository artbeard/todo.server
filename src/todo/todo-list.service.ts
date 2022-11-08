import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListEntity } from './list.entity';

@Injectable()
export class TodoListService {
    constructor(
        @InjectRepository(ListEntity)
        private ListEntityRepository: Repository<ListEntity>,
    ){}

    findAll(uid: number):Promise<ListEntity[]> 
	{	
		return this.ListEntityRepository.find({
            where: {
                userId: uid,
            },
			relations: {
				items: true,
			},
		});
	}

    findOne(list_id: number): Promise<ListEntity> {
		return this.ListEntityRepository.findOne({
            where: {
                id: list_id,
            },
			relations: {
				items: true,
			},
        });
	}

    completedItem(item_id: number)
    {
        
    }
}
