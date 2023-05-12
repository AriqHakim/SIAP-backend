import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterNullablePresensi1683896570987 implements MigrationInterface {
  name = 'alterNullablePresensi1683896570987';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`presensi\` CHANGE \`bukti\` \`bukti\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`presensi\` CHANGE \`date\` \`date\` datetime NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`presensi\` CHANGE \`date\` \`date\` datetime NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`presensi\` CHANGE \`bukti\` \`bukti\` varchar(255) NOT NULL`,
    );
  }
}
