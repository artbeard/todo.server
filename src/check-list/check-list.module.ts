import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckListController } from './check-list.controller';

import { ListEntity } from './list.entity';
import { ItemEntity } from './item.entity';
import { CheckListService } from './check-list.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([ListEntity, ItemEntity])
	],
	controllers: [CheckListController],
	providers: [CheckListService]
})
export class CheckListModule {}
