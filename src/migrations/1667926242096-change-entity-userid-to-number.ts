import { MigrationInterface, QueryRunner } from "typeorm";

export class changeEntityUseridToNumber1667926242096 implements MigrationInterface {
    name = 'changeEntityUseridToNumber1667926242096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`list_entity\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`list_entity\` ADD \`userId\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`list_entity\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`list_entity\` ADD \`userId\` varchar(255) NOT NULL`);
    }

}
