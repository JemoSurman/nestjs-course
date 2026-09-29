import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient, Prisma } from "@prisma/client"

@Injectable()
export class PrismaService extends PrismaClient 
    implements OnModuleInit, OnModuleDestroy {
    async onModuleInit() {
        await this.$connect();
    }

    get extendedClient(){
        return this.$extends({
            model: {
                $allModels: {
                    async softDelete(id: number) {
                        const context = Prisma.getExtensionContext(this);
                        return (context as any).update({
                            where: { id },
                            data: { deletedAt: new Date() },
                        })
                    },
                },
            },
            query: {
                $allModels: {
                    async findMany({ args, query }) {
                        args.where = { ...args.where, deletedAt: null};
                        return query(args);
                    },
                    async findFirst({ args, query }){
                        args.where = { ...args.where, deletedAt: null};
                        return query(args);
                    } 
                }
                
            }
        })
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}