import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany} from "typeorm"
import { phonebook } from "./phonebook";

@Entity()
export class user extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    image: string;

    @OneToMany(() => phonebook, (phonebook)=>phonebook.user)
    phonebook: phonebook;

}

