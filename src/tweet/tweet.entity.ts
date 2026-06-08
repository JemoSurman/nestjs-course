import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, Entity, ManyToMany, JoinTable } from "typeorm";
import { User } from "../users/users.entity";
import { Hashtag } from "../hashtag/hashtag.entity";

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

    @ManyToMany(() => Hashtag, (hashtag) => hashtag.tweets)
    @JoinTable()
    hashtags!: Hashtag[];
}