import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import {ItemEntity} from './item.entity'

@Entity()
export class ListEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	userId: string;

	@OneToMany(() => ItemEntity, (item) => item.list)
	items: ItemEntity[];

	@Column({ default: false })
	isActive: boolean;
}