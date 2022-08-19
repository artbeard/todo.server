import { Module } from '@nestjs/common';
import { CheckListController } from './check-list.controller';

@Module({
  controllers: [CheckListController]
})
export class CheckListModule {}
