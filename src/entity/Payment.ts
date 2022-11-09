import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToOne,
    JoinColumn
} from "typeorm";
import {Length, IsEnum} from 'class-validator';
import {Order} from "./Order";
import {PaymentStatus} from "./PaymentStatus";

enum PaymentType {
    payPal = "payPal",
    creditCard = "creditCard",
    debitCard = "debitCard",
    stripe = "stripe"
}

enum ShippingOption {
    standard = "Standard Shipping",
    express = "Express Shipping",
    nextDay = "Next Day Air"
}

@Entity()
export class Payment {

    @Column()
    id: string;

    @Column()
    @Length(1, 100)
    firstName: string;

    @Column()
    @Length(1, 100)
    lastName: string;

    @Column('decimal', {precision: 8, scale: 2})
    preTaxTotalPrice: number;

    @Column('decimal',{precision: 5, scale:2, default: 1.13})
    taxRate: number;

    @Column('decimal',{precision: 8, scale:2})
    afterTaxTotalPrice: number;

    @Column()
    phone: string;

    @Column()
    @Length(10, 200)
    shipping_address: string;

    @Column()
    @Length(10, 200)
    billing_address: string;

    @Column()
    payment_Plan: string; 

    @Column()
    @IsEnum(PaymentType)
    payment_type: PaymentType;

    @Column()
    @IsEnum(ShippingOption)
    shipping_option: ShippingOption; 

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date

    @Column({nullable: true, default: false})
    isActive: boolean

    @Column({nullable: true, default: false})
    isDelete: boolean

    @OneToOne(() => Order, {primary: true})
    @JoinColumn()
    order: Order;

    @ManyToOne(() => PaymentStatus, PaymentStatus => PaymentStatus.payment)
    paymentStatus: PaymentStatus

}
