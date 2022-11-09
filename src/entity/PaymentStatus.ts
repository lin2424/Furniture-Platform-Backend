import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
    BeforeUpdate
} from "typeorm";
import {IsEnum} from 'class-validator';
import { Payment } from "./Payment";

export enum paymentStatusType {
    COMPLETE= "COMPLETE",
    PENDING= "PENDING",
    REFUNDED= "REFUNDED",
    ABANDONED= "ABANDONED",
    CANCELLED= "CANCELLED",
}

@Entity()

export class PaymentStatus {

    @BeforeUpdate()
    updateDates() {
        this.updateAt= new Date()
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsEnum(paymentStatusType)
    status: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @CreateDateColumn()
    updateAt: Date

    @OneToMany(() => Payment, payment => payment.paymentStatus)
    payment: Payment[];
}
