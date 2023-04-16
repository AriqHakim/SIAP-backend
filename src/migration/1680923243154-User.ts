import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1680923243154 implements MigrationInterface {
  name = 'User1680923243154';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(50) NOT NULL, \`password\` varchar(255) NOT NULL, \`name\` varchar(50) NOT NULL, \`npm\` varchar(12) NOT NULL, \`no_telp\` varchar(20) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
