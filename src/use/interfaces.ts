import {Request} from "express";
import {UserEntity} from "../user/user.entity";
import {ItemEntity} from "../todo/item.entity";

export interface IRequestWithUserAuth extends Request {
    user: UserEntity | undefined
}

export interface IUserDto{
    id?: number;
    name: string;
    password?: string;
    email?: string;
    createdAt?: Date;
    lastActive?: Date;
    isActive?: boolean;
    hash?: string;
}

export interface ITodoListDto{
    id?: number;
    title: string;
    userId?: number;
    items?: ItemEntity[];
    isActive?: boolean;
}

export interface ITodoItemDto{
    id?: number,
    content: string,
    completed?: boolean,
    position?: number,
}