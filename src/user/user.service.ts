import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UserEntity} from './user.entity';
import {createHmac} from 'crypto'

interface ICreateUser{
	name: string,
	email?: string,
	password?: string
}

@Injectable()
export class UserService {

	constructor(
		@InjectRepository(UserEntity)
		private userEntityRepository: Repository<UserEntity>,
	) {}

	createNewUser({name}: ICreateUser): Promise<UserEntity>
	{
		const newUser = new UserEntity();
		newUser.name = name;
		newUser.isActive = true;
		return this.userEntityRepository.save(newUser)
			.then(createdUser => {
				const hasher = createHmac('sha256', Date());
				createdUser.hash = hasher.update(String(createdUser.id)).digest('hex');
				return this.userEntityRepository.save(createdUser)
			})
	}

	getUser(id: number): Promise<UserEntity>
	{
		return this.userEntityRepository.findOneByOrFail({id})
	}

	isValidUser(user: UserEntity, token: string): boolean
	{
		return user.hash === token;
	}
}
