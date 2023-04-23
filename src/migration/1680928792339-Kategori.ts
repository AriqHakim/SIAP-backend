import { MigrationInterface, QueryRunner } from 'typeorm';

export class Kategori1680928792339 implements MigrationInterface {
  name = 'Kategori1680928792339';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`kategori\` (\`id\` varchar(36) NOT NULL, \`judul\` varchar(50) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`kategori\``);
  }
}
