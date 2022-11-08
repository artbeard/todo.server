import { MigrationInterface, QueryRunner } from "typeorm";

export class changeEntityCompleted1667925205621 implements MigrationInterface {
    name = 'changeEntityCompleted1667925205621'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`item_entity\` CHANGE \`checked\` \`completed\` tinyint NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`item_entity\` CHANGE \`completed\` \`completed\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`item_entity\` CHANGE \`completed\` \`completed\` tinyint NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`item_entity\` CHANGE \`completed\` \`checked\` tinyint NOT NULL DEFAULT '1'`);
    }

}
