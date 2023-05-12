import { MigrationInterface, QueryRunner } from 'typeorm';

export class deleteDeskripsiColumn1683770502574 implements MigrationInterface {
  name = 'deleteDeskripsiColumn1683770502574';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`pertemuan\` DROP COLUMN \`deskripsi\``,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`pertemuan\` ADD \`deskripsi\` text NOT NULL`,
    );
  }
}
