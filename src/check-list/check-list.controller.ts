import { Controller, Get } from '@nestjs/common';
import { ListEntity } from './list.entity';
import { CheckListService } from './check-list.service'

@Controller('check-list')
export class CheckListController {

    constructor(private checkListService: CheckListService){}

    @Get('/')
    async getList()//:ListEntity[]
    {
        const list = await this.checkListService.findAll();
        const items = await list[0].items;
        return [list, items]
    }
}
