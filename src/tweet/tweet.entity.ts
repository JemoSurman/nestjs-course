import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, Entity } from "typeorm";
import { User } from "../users/users.entity";

@Entity()
export class Tweet {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'text',
        nullable: false
    })
    text!: string;

    @Column({
        type: 'text',
        nullable: true
    })
    image?: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @ManyToOne(() => User, (user) => user.tweets)
    user!: User;
}