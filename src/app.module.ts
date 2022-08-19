import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CheckListModule } from './check-list/check-list.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'check_list',
      entities: ['./**/*.entity.{ts|js}'],
      synchronize: true,
    }),
    CheckListModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
