import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Length, Min} from 'class-validator';
import { OrderProduct } from "./OrderProduct";
import { ProfileCategories } from "./ProfileCategories";

@Entity()

export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(1, 200)
    slug: string;

    @Column()
    @Length(1, 200)
    name: string;

    @Column('decimal', {precision: 6, scale: 2})
    @Min(0)
    price: number;

    @Column()
    description: string;

    @Column()
    media: string;

    @Column()
    colorPalette: string;

    @Column({nullable: true, default: false})
    isActive: boolean
    
    @Column({nullable: true, default: false})
    isDelete: boolean

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => OrderProduct, entity => entity.product )
    orderProducts: OrderProduct[];

    @ManyToMany(() => ProfileCategories, entity => entity.products)
    profileCategories: Promise<ProfileCategories[]>; 

}
