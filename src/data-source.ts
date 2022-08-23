import { DataSource } from "typeorm"
import { ListEntity } from './check-list/list.entity'
import { ItemEntity } from './check-list/item.entity'

console.log('dataSource dirname:', __dirname);

const AppDataSource = new DataSource({
	type: 'mysql',
	host: 'localhost',
	port: 3306,
	username: 'root',
	password: '',
	database: 'check_list',
	synchronize: true,
	entities: [
		__dirname + '/**/*.entity.js',
	//	__dirname + '/../src/**/*.entity{.ts|.js}'
	],
	//entities: [ListEntity, ItemEntity],
	migrationsTableName: "migrations",
	migrations: [
		__dirname + '/migrations/*.js',
		//__dirname + '/../src/migrations/*.ts'
	],
})

export default AppDataSource;