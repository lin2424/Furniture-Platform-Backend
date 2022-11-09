import {Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique} from "typeorm";
import {IsEmail, Length} from "class-validator";
import {Order} from "./Order";

@Entity()
@Unique(['email'])

export class User{

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @Length(1, 100)
    firstName: string;

    @Column()
    @Length(1, 100)
    lastName: string;

    @Column()
    @IsEmail()
    @Length(5, 150)
    email: string;

    @Column()
    @Length(8, 200)
    password: string;

    @Column({nullable: true})
    refreshToken: string;

    @OneToMany(() => Order, order => order.user)
    orders: Order[]
}
