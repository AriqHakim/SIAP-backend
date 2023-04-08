import { MigrationInterface, QueryRunner } from "typeorm";

export class Admin1680922513935 implements MigrationInterface {
    name = 'Admin1680922513935'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`admin\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(50) NOT NULL, \`email\` varchar(50) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`admin\``);
    }

}
