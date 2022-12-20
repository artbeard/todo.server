import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('varchar',{length: 100})
	name: string;

	@Column('varchar', {length: 300, nullable: true})
	password: string;

	@Column('varchar',{length: 128, nullable: true})
	email: string;

	@CreateDateColumn()
	createdAt: Date;

	//Дата последнего доступа
	@UpdateDateColumn({nullable: true})
	lastActive: Date;

	@Column({ default: false })
	isActive: boolean;

	//временное решение, позже переделать для активации
	@Column('varchar', {length: 300, unique: true, nullable: true})
	hash: string;

	//Позже добавить
	//roles

	// @ManyToOne(() => ListEntity, (list) => list.items)
	// uid: ListEntity;
}
