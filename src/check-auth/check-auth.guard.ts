import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable()
export class CheckAuthGuard implements CanActivate {

    constructor(
        private userService: UserService
    ) {}

    canActivate( context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const cookies = context.switchToHttp().getRequest()?.cookies;
        if (!cookies.uid || !cookies.token)
            return false;
        return new Promise((resolve) => {
            this.userService.getUser(cookies.uid)
                .then(user => {
                    if (this.userService.isValidUser(user, cookies.token)) {
                        const request = context.switchToHttp().getRequest();
                        request.user = user;
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                })
        })
    }
}
