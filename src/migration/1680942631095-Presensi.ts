import { MigrationInterface, QueryRunner } from 'typeorm';

export class Presensi1680942631095 implements MigrationInterface {
  name = 'Presensi1680942631095';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`presensi\` (\`id\` varchar(36) NOT NULL, \`bukti\` varchar(255) NOT NULL, \`date\` datetime NOT NULL, \`status\` enum ('Hadir', 'Sakit', 'Izin', 'Tidak Hadir') NOT NULL, \`is_validate\` tinyint NOT NULL, \`pertemuan_id\` varchar(36) NULL, \`user_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`presensi\` ADD CONSTRAINT \`FK_7c1c1f060c63060fe0cecfaaf9f\` FOREIGN KEY (\`pertemuan_id\`) REFERENCES \`pertemuan\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`presensi\` ADD CONSTRAINT \`FK_67baf4f8d78fd156128bcbf1737\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`presensi\` DROP FOREIGN KEY \`FK_67baf4f8d78fd156128bcbf1737\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`presensi\` DROP FOREIGN KEY \`FK_7c1c1f060c63060fe0cecfaaf9f\``,
    );
    await queryRunner.query(`DROP TABLE \`presensi\``);
  }
}
