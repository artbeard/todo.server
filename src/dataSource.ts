import { DataSource } from "typeorm"

const AppDataSource = new DataSource({
	type: 'mysql',
	host: 'localhost',
	port: 3306,
	username: 'root',
	password: '',
	database: 'check_list',
	entities: ['../**/*.entity.{ts|js}'],
})