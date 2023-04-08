import { MigrationInterface, QueryRunner } from "typeorm";

export class Attachment1680940072309 implements MigrationInterface {
    name = 'Attachment1680940072309'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`attachment\` (\`id\` varchar(36) NOT NULL, \`judul\` varchar(50) NOT NULL, \`url\` varchar(255) NOT NULL, \`broadcastId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`attachment\` ADD CONSTRAINT \`FK_334a3e19ad51ec17b45b865d4ee\` FOREIGN KEY (\`broadcastId\`) REFERENCES \`broadcast\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`attachment\` DROP FOREIGN KEY \`FK_334a3e19ad51ec17b45b865d4ee\``);
        await queryRunner.query(`DROP TABLE \`attachment\``);
    }

}
