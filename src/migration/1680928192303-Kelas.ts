import { MigrationInterface, QueryRunner } from "typeorm";

export class Kelas1680928192303 implements MigrationInterface {
    name = 'Kelas1680928192303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`kelas\` (\`id\` varchar(36) NOT NULL, \`judul\` varchar(50) NOT NULL, \`deskripsi\` varchar(50) NOT NULL, \`kode\` varchar(6) NOT NULL, \`asisten_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`kelas\` ADD CONSTRAINT \`FK_7e32db5ca2bff5eb45e0735caaa\` FOREIGN KEY (\`asisten_id\`) REFERENCES \`asisten_praktikum\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`kelas\` DROP FOREIGN KEY \`FK_7e32db5ca2bff5eb45e0735caaa\``);
        await queryRunner.query(`DROP TABLE \`kelas\``);
    }

}
