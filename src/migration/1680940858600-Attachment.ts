import { MigrationInterface, QueryRunner } from "typeorm";

export class Attachment1680940858600 implements MigrationInterface {
    name = 'Attachment1680940858600'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`attachment\` (\`id\` varchar(36) NOT NULL, \`judul\` varchar(50) NOT NULL, \`url\` varchar(255) NOT NULL, \`broadcast_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`attachment\` ADD CONSTRAINT \`FK_8cc49dd60bd7e895ebdc001854b\` FOREIGN KEY (\`broadcast_id\`) REFERENCES \`broadcast\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`attachment\` DROP FOREIGN KEY \`FK_8cc49dd60bd7e895ebdc001854b\``);
        await queryRunner.query(`DROP TABLE \`attachment\``);
    }

}
