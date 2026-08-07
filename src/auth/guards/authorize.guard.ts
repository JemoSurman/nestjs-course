import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import type { ConfigType } from "@nestjs/config";
import { Request } from "express";
import authConfig from "../config/auth.config";

@Injectable()
export class AuthorizedGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,

        @Inject(authConfig.KEY)
        private readonly authConfiguration: ConfigType<typeof authConfig>       
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        //1. EXTRACT REQUEST FROM EXECUTION CONTEXT
        const request:Request = context.switchToHttp().getRequest();

        //2. EXTRACT TOKEN FROM THE REQUEST HEADER
        //Bearer actual-json-web-token = ['Bearer', 'actual-json-web-token']
        const token = request.headers.authorization?.split(' ')[1];
        
        //3. VALIDATE TOKEN AND PROVIDE / DENY ACCESS
        if(!token){
            throw new UnauthorizedException();
        }
        
        try{
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.authConfiguration.secret
            }) 
            request['user'] = payload;

        }catch(error){
            throw new UnauthorizedException();
        }

        return true;
    }
}