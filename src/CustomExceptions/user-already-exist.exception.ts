import { HttpException, HttpStatus } from "@nestjs/common";

export class UserAlreadyExistsException extends HttpException {
    constructor(FiledName: string, FiledValue: string) {
        super(`User with ${FiledName} ${FiledValue} already exist.`, HttpStatus.CONFLICT)
    }
}