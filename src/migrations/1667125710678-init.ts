import { MigrationInterface, QueryRunner } from "typeorm";

export class init1667125710678 implements MigrationInterface {
    name = 'init1667125710678'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`list_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`userId\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`item_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` varchar(255) NOT NULL, \`position\` int NOT NULL, \`checked\` tinyint NOT NULL DEFAULT 1, \`listId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`item_entity\` ADD CONSTRAINT \`FK_00bdba79708e4138863005a8fce\` FOREIGN KEY (\`listId\`) REFERENCES \`list_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`item_entity\` DROP FOREIGN KEY \`FK_00bdba79708e4138863005a8fce\``);
        await queryRunner.query(`DROP TABLE \`item_entity\``);
        await queryRunner.query(`DROP TABLE \`list_entity\``);
    }

}
