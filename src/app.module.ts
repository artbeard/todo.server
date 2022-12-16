import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from 'typeorm';
//удалить
import { AppController } from './app.controller';
import { AppService } from './app.service';

//Модули
import { TodoModule } from './todo/todo.module';
//Сущности
//import { ListEntity } from './todo/list.entity';
//import { ItemEntity } from './todo/item.entity';

import { dataSourceOptions } from "./data-source";


@Module({
	imports: [
		TypeOrmModule.forRoot(dataSourceOptions),
		TodoModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
	//	CheckListService
	],
})

export class AppModule {
	constructor(private dataSource: DataSource){}
}
