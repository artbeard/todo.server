import {Request} from "express";
import {UserEntity} from "../user/user.entity";
import {Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

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