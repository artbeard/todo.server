import { DataSource, DataSourceOptions } from "typeorm"

export const dataSourceOptions: any = {
	type: 'mysql',
	host: '127.0.0.1',
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
};
//export dataSourceOptions;

const AppDataSource = new DataSource(dataSourceOptions as DataSourceOptions)
export default AppDataSource;
