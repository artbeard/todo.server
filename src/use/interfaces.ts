import {Request} from "express";
import {UserEntity} from "../user/user.entity";
import {ItemEntity} from "../todo/item.entity";

export interface IRequestWithUserAuth extends Request {
    user: UserEntity | undefined
}

export interface IUserDto{
    id?: number | null;
    name: string;
    password?: string | null;
    email?: string | null;
    createdAt?: Date;
    lastActive?: Date;
    isActive?: boolean;
    hash?: string | null;
}

export interface ITodoListDto{
    id?: number;
    title: string;
    userId?: number;
    items?: ItemEntity[];
    isActive?: boolean;
}