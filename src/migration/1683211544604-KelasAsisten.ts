import { MigrationInterface, QueryRunner } from 'typeorm';

export class KelasAsisten1683211544604 implements MigrationInterface {
  name = 'KelasAsisten1683211544604';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`kelas_asisten\` (\`id\` varchar(36) NOT NULL, \`asisten_id\` varchar(36) NULL, \`kelas_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`kelas_asisten\` ADD CONSTRAINT \`FK_de67ce978b889ddd2851ed579b4\` FOREIGN KEY (\`asisten_id\`) REFERENCES \`asisten_praktikum\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`kelas_asisten\` ADD CONSTRAINT \`FK_bcdc998bebab330afcd7769d2e1\` FOREIGN KEY (\`kelas_id\`) REFERENCES \`kelas\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`kelas_asisten\` DROP FOREIGN KEY \`FK_bcdc998bebab330afcd7769d2e1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`kelas_asisten\` DROP FOREIGN KEY \`FK_de67ce978b889ddd2851ed579b4\``,
    );
    await queryRunner.query(`DROP TABLE \`kelas_asisten\``);
  }
}
