import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	listId: number;

	@Column()
	content: string;

	@Column()
	position: number;

	@Column({ default: false })
	checked: boolean;
}