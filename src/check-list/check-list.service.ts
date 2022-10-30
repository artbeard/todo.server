import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListEntity } from './list.entity';
import { ItemEntity } from './item.entity';

@Injectable()
export class CheckListService {
	constructor(
		@InjectRepository(ListEntity)
		private ListEntityRepository: Repository<ListEntity>,
		// @InjectRepository(ItemEntity)
		// private ItemEntityRepository: Repository<ItemEntity>,
	) {}
	
	async findAll()//: ListEntity[] 
	{	
		const allList = await this.ListEntityRepository.find();
		return allList
	}
	
	findOne(id: number): Promise<ListEntity> {
		return this.ListEntityRepository.findOneBy({ id });
	}
	
	async remove(id: string): Promise<void> {
		await this.ListEntityRepository.delete(id);
	}
}
