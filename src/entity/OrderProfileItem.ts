import {
    Entity,
    Column,
    ManyToOne,
} from "typeorm";

import { ProfileItem } from "./ProfileItem";
import { Order } from "./Order";


@Entity()
export class OrderProfileitem {

    @ManyToOne(() => ProfileItem, p => p.orderProfileItems, { primary: true })
    profileItem: ProfileItem;

    @ManyToOne(() => Order, p => p.orderProfileItems, { primary: true, onDelete: 'CASCADE' })
    order: Order;

    @Column('int')
    amount: number;
}