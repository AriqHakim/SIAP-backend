import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveOneToManyAsistenKelas1683211761622
  implements MigrationInterface
{
  name = 'RemoveOneToManyAsistenKelas1683211761622';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`kelas\` DROP FOREIGN KEY \`FK_7e32db5ca2bff5eb45e0735caaa\``,
    );
    await queryRunner.query(`ALTER TABLE \`kelas\` DROP COLUMN \`asisten_id\``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`kelas\` ADD \`asisten_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`kelas\` ADD CONSTRAINT \`FK_7e32db5ca2bff5eb45e0735caaa\` FOREIGN KEY (\`asisten_id\`) REFERENCES \`asisten_praktikum\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
