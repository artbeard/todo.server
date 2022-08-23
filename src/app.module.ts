import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CheckListModule } from './check-list/check-list.module';

// import { ListEntity } from './check-list/list.entity'
// import { ItemEntity } from './check-list/item.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'check_list',
      entities: [
          __dirname + '/**/*.entity.{ts|js}'
      ],
      //entities: [ListEntity, ItemEntity],
      // migrations: [
      //     __dirname + '/migrations/*{.ts,.js}',
      //     __dirname + '/../src/migrations/*{.ts,.js}'
      // ],
      // migrationsTableName: "migrations",
      synchronize: false,
    }),
    CheckListModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
