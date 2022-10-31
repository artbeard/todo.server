import { Controller, Get } from '@nestjs/common';
import { ListEntity } from './list.entity';
import { CheckListService } from './check-list.service'
import { ItemEntity } from './item.entity';

@Controller('check-list')
export class CheckListController {

    constructor(private checkListService: CheckListService){}

    @Get('/')
    async getList()//:Promise<ListEntity[]>
    {
        const Result = new Promise((Resolve) => {
            const list = this.checkListService.findAll()
            .then(data => {
                const nItem = new ItemEntity();
                nItem.content = 'Добавлен исскуственно';
                nItem.position = 10;
                nItem.checked = false;
                //nItem.list = data[0];
                nItem.id = 133;

                data[0].items.push(nItem)
                
                Resolve(data);
            });
        })
        
        //const items = await list[0].items;
        return Result
    }
}
