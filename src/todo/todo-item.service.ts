import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemEntity } from './item.entity';

@Injectable()
export class TodoItemService {
    constructor(
        @InjectRepository(ItemEntity)
        private ItemEntityRepository: Repository<ItemEntity>,
    ){}

    findOne(item_id: number): Promise<ItemEntity> {
		return this.ItemEntityRepository.findOne({
            where: {
                id: item_id,
            },
			relations: {
				list: true,
			},
        });
	}

    save(item)
    {
        this.ItemEntityRepository.save(item);
    }
}
