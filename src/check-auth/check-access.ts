import { ItemEntity } from "../todo/item.entity";
import { ListEntity } from "../todo/list.entity";
import { UserEntity } from "../user/user.entity";

export class CheckAccess{

    hasAccess(user: UserEntity, entity: ItemEntity | ListEntity): boolean
    {
        if (entity instanceof ListEntity)
        {
            return user.id === entity.userId;
        }

        if (entity instanceof ItemEntity)
        {
            return user.id === entity.list.userId;
        }

        return false;
    }
}