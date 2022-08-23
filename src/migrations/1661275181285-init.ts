import { MigrationInterface, QueryRunner } from "typeorm";

export class init1661275181285 implements MigrationInterface {
    name = 'init1661275181285'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`item_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`listId\` int NOT NULL, \`content\` varchar(255) NOT NULL, \`position\` int NOT NULL, \`checked\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`list_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`userId\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`list_entity\``);
        await queryRunner.query(`DROP TABLE \`item_entity\``);
    }

}
