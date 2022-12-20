import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from 'typeorm';
import { ConverterService } from "./converter.service";
//удалить
import { AppController } from './app.controller';
import { AppService } from './app.service';

//Модули
import { TodoModule } from './todo/todo.module';
//Сущности
//import { ListEntity } from './todo/list.entity';
//import { ItemEntity } from './todo/item.entity';

import { dataSourceOptions } from "./data-source";
import { UserModule } from './user/user.module';


@Module({
	imports: [
		TypeOrmModule.forRoot(dataSourceOptions),
		TodoModule,
		UserModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		ConverterService,
	]
})

export class AppModule {
	constructor(private dataSource: DataSource){}
}
