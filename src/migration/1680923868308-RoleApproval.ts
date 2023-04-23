import { MigrationInterface, QueryRunner } from 'typeorm';

export class RoleApproval1680923868308 implements MigrationInterface {
  name = 'RoleApproval1680923868308';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`role_approval\` (\`id\` varchar(36) NOT NULL, \`status\` enum ('Accepted', 'Pending', 'Rejected') NOT NULL, \`user_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`role_approval\` ADD CONSTRAINT \`FK_7316e89e7abfabde82586b4dca4\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`role_approval\` DROP FOREIGN KEY \`FK_7316e89e7abfabde82586b4dca4\``,
    );
    await queryRunner.query(`DROP TABLE \`role_approval\``);
  }
}
