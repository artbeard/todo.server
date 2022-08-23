import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {ListEntity} from "./list.entity";

@Entity()
export class ItemEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	listId: number;

	@Column()
	content: string;

	@Column()
	position: number;

	@Column({ default: true })
	checked: boolean;
}