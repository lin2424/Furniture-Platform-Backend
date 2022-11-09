import {
    Entity,
    Column,
    ManyToOne,
} from "typeorm";

import { Order } from "./Order";
import { Product } from "./Product";


@Entity()
export class OrderProduct{

    @ManyToOne(() => Product, p => p.orderProducts, {eager: true, primary: true})
    product: Product;

    @ManyToOne(() => Order, p => p.orderProduct, { primary: true, onDelete: 'CASCADE' })
    order: Order;

    @Column('int')
    amount: number;
}