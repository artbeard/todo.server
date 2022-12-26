import {Request} from "express";
import {UserEntity} from "../user/user.entity";

export interface IRequestWithUserAuth extends Request {
    user: UserEntity | undefined
}