import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinTable, ManyToMany } from "typeorm";
import { Length } from 'class-validator';
import { ProfileItem } from "./ProfileItem";
import { Product } from "./Product";

@Entity()

export class ProfileCategories {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(1, 200)
    name: string;

    @Column()
    @Length(1, 2)
    displayMode: number;

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => ProfileItem, entity => entity.profileCategory, {eager: true})
    profileItems: ProfileItem[];

    @ManyToMany(() => Product, entity => entity.profileCategories)
    @JoinTable()
    products: Promise<Product[]>; 
    category1: Product[];

}
