import { MigrationInterface, QueryRunner } from "typeorm";

export class Pertemuan1680941170378 implements MigrationInterface {
    name = 'Pertemuan1680941170378'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`pertemuan\` (\`id\` varchar(36) NOT NULL, \`judul\` varchar(50) NOT NULL, \`deskripsi\` text NOT NULL, \`start_date\` datetime NOT NULL, \`end_date\` datetime NOT NULL, \`index_pert\` tinyint NOT NULL, \`kelas_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`pertemuan\` ADD CONSTRAINT \`FK_295575063a9ac4620a82b8e9dad\` FOREIGN KEY (\`kelas_id\`) REFERENCES \`kelas\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`pertemuan\` DROP FOREIGN KEY \`FK_295575063a9ac4620a82b8e9dad\``);
        await queryRunner.query(`DROP TABLE \`pertemuan\``);
    }

}
