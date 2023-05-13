import { MigrationInterface, QueryRunner } from 'typeorm';

export class Broadcast1680939543362 implements MigrationInterface {
  name = 'Broadcast1680939543362';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`broadcast\` (\`id\` varchar(36) NOT NULL, \`judul\` varchar(50) NOT NULL, \`deskripsi\` text NOT NULL, \`date\` datetime NOT NULL, \`kelas_id\` varchar(36) NULL, \`owner_id\` varchar(36) NULL, \`kategori_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`broadcast\` ADD CONSTRAINT \`FK_279581d5a13d3939351f418b0b3\` FOREIGN KEY (\`kelas_id\`) REFERENCES \`kelas\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`broadcast\` ADD CONSTRAINT \`FK_48efea565167b4261378bbfb942\` FOREIGN KEY (\`owner_id\`) REFERENCES \`asisten_praktikum\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`broadcast\` DROP FOREIGN KEY \`FK_48efea565167b4261378bbfb942\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`broadcast\` DROP FOREIGN KEY \`FK_279581d5a13d3939351f418b0b3\``,
    );
    await queryRunner.query(`DROP TABLE \`broadcast\``);
  }
}
