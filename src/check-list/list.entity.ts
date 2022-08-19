import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class List {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	userId: string;

	@Column({ default: true })
	isActive: boolean;
}