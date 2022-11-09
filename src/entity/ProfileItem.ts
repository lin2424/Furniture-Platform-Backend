import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { Length, Min} from 'class-validator';
import { OrderProfileitem } from "./OrderProfileItem";
import { ProfileCategories } from "./ProfileCategories";

@Entity()

export class ProfileItem {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(1, 200)
    name: string;

    @Column('decimal', {precision: 6, scale: 2})
    @Min(0)
    price: number;

    @Column()
    media: string;

    @Column({default: false})
    disabled: boolean
    
    @Column({default: false})
    checked: boolean

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => OrderProfileitem, entity => entity.profileItem )
    orderProfileItems: OrderProfileitem[];

    @ManyToOne(() => ProfileCategories, entity => entity.profileItems)
    profileCategory: ProfileCategories;

}
