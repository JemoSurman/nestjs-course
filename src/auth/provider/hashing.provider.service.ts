
export abstract class HashingProvider {
    abstract hashPassword(data: string | Buffer): Promise<string>;

    abstract comparePassword(
        PlainPassword: string | Buffer, 
        hashedPassword: string | Buffer
    ): Promise<boolean>
}
