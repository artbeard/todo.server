import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ListEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	userId: string;

	@Column({ default: false })
	isActive: boolean;
}