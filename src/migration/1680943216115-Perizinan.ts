import { MigrationInterface, QueryRunner } from 'typeorm';

export class Perizinan1680943216115 implements MigrationInterface {
  name = 'Perizinan1680943216115';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`perizinan\` (\`id\` varchar(36) NOT NULL, \`date\` datetime NOT NULL, \`status\` enum ('Hadir', 'Sakit', 'Izin', 'Tidak Hadir') NOT NULL, \`bukti\` varchar(255) NOT NULL, \`pertemuan_id\` varchar(36) NULL, \`user_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`perizinan\` ADD CONSTRAINT \`FK_fe7b48a29bbef12e410f9ce254a\` FOREIGN KEY (\`pertemuan_id\`) REFERENCES \`pertemuan\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`perizinan\` ADD CONSTRAINT \`FK_2afe3b05b78fa0db349442bc2a1\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`perizinan\` DROP FOREIGN KEY \`FK_2afe3b05b78fa0db349442bc2a1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`perizinan\` DROP FOREIGN KEY \`FK_fe7b48a29bbef12e410f9ce254a\``,
    );
    await queryRunner.query(`DROP TABLE \`perizinan\``);
  }
}
