import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany
} from "typeorm";
import {  IsEnum } from 'class-validator';
import { Order } from "./Order";

export enum orderStatusType {
    INPROGRESS = "In Progress",
    PAYMENTRECEIVED = "Payment received",
    PAYMENTFAILED = "Payment failed",
    COMPLETED = "Completed",
    CLOSED = "Closed",
    CANCELLED = "Cancelled"
}

@Entity()

export class OrderStatus {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsEnum(orderStatusType)
    status: string;

    @OneToMany(() => Order, order => order.orderStatus)
    order: Order[];
}
