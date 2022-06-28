import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne} from "typeorm"
import {user} from "./user"

@Entity()
export class phonebook extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    phoneno: string;

    @Column()
    userId: number;

    @ManyToOne(()=> user,(userId)=>userId.phonebook)
    user: user;
}

