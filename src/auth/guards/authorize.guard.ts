import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class AuthorizedGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        //1. EXTRACT REQUEST FROM EXECUTION CONTEXT
        const request:Request = context.switchToHttp().getRequest();

        //2. EXTRACT TOKEN FROM THE REQUEST HEADER
        //Bearer actual-json-web-token = ['Bearer', 'actual-json-web-token']
        const token = request.headers.authorization?.split(' ')[1];
        console.log(token);
        //3. VALIDATE TOKEN AND PROVIDE / DENY ACCESS
        return true;
    }
}