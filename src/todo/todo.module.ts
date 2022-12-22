import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//Контроллеры
import { TodoController } from './todo.controller';
import { TodoListController } from './todo-list.controller';
//Сервисы
import { TodoListService } from './todo-list.service';
import { TodoItemService } from './todo-item.service';

//Сущности
import { ListEntity } from './list.entity';
import { ItemEntity } from './item.entity';

import { UserModule } from "../user/user.module";

@Module({
    imports: [
		TypeOrmModule.forFeature([ListEntity, ItemEntity]),
		UserModule
	],
    controllers: [TodoController, TodoListController],
	providers: [TodoListService, TodoItemService]
})
export class TodoModule {}
