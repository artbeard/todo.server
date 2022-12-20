import { MigrationInterface, QueryRunner } from "typeorm";

export class createdUserEntity1671555469749 implements MigrationInterface {
    name = 'createdUserEntity1671555469749'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`password\` varchar(300) NULL, \`email\` varchar(128) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`lastActive\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`isActive\` tinyint NOT NULL DEFAULT 0, \`hash\` varchar(300) NULL, UNIQUE INDEX \`IDX_d1c2941ab1273015abb998f537\` (\`hash\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_d1c2941ab1273015abb998f537\` ON \`user_entity\``);
        await queryRunner.query(`DROP TABLE \`user_entity\``);
    }

}
