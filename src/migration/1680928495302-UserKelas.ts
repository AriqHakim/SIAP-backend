import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserKelas1680928495302 implements MigrationInterface {
  name = 'UserKelas1680928495302';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user_kelas\` (\`id\` varchar(36) NOT NULL, \`user_id\` varchar(36) NULL, \`kelas_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_kelas\` ADD CONSTRAINT \`FK_5bc9f14dfe326c563b28ac20af0\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_kelas\` ADD CONSTRAINT \`FK_25c1f74aa48dbfdf0585dfd3909\` FOREIGN KEY (\`kelas_id\`) REFERENCES \`kelas\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_kelas\` DROP FOREIGN KEY \`FK_25c1f74aa48dbfdf0585dfd3909\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_kelas\` DROP FOREIGN KEY \`FK_5bc9f14dfe326c563b28ac20af0\``,
    );
    await queryRunner.query(`DROP TABLE \`user_kelas\``);
  }
}
