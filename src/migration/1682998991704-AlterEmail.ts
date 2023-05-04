import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterEmail1682998991704 implements MigrationInterface {
  name = 'AlterEmail1682998991704';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`admin\` ADD UNIQUE INDEX \`IDX_de87485f6489f5d0995f584195\` (\`email\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`admin\` DROP INDEX \`IDX_de87485f6489f5d0995f584195\``,
    );
  }
}
