import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import {ListEntity} from "./list.entity";

@Entity()
export class ItemEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => ListEntity, (list) => list.items)
	list: ListEntity;

	@Column()
	content: string;

	@Column()
	position: number;

	@Column({ default: true })
	checked: boolean;
}