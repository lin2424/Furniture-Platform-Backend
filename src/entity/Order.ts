import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    JoinColumn
} from "typeorm";
import { Min } from 'class-validator';
import { Payment } from "./Payment";
import {OrderStatus} from "./OrderStatus";
import { User } from "./User";
import { OrderProfileitem } from "./OrderProfileItem";
import { OrderProduct } from "./OrderProduct";


@Entity()

export class Order {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column('decimal', {precision: 8, scale: 2})
    @Min(0)
    totalPrice: number;

    @Column()
    pricePerSingleChair: string;

    @Column()
    profileItemNameforEachChair: string;

    @Column({default: false})
    isActive: boolean
    
    @Column({default: false})
    isDelete: boolean    

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date

    @OneToOne(() => Payment)
    @JoinColumn()
    payment: Payment;

    @ManyToOne(() => OrderStatus, orderStatus => orderStatus.order, {eager: true})
    orderStatus: OrderStatus;

    @OneToMany(() => OrderProfileitem, od=>od.order, {eager: true})
    orderProfileItems: OrderProfileitem[]

    @OneToMany(() => OrderProduct, od=>od.order, {eager: true})
    orderProduct: OrderProduct[]

    @ManyToOne(() => User, user => user.orders, {nullable: true})
    user: User
    status: OrderStatus;

}
