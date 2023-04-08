import { MigrationInterface, QueryRunner } from "typeorm";

export class AsistenPraktikum1680924698192 implements MigrationInterface {
  name = "AsistenPraktikum1680924698192";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`asisten_praktikum\` (\`id\` varchar(36) NOT NULL, \`instansi\` varchar(50) NOT NULL, \`user_id\` varchar(36) NULL, UNIQUE INDEX \`REL_48934dd11b1044a85efaa5b887\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`asisten_praktikum\` ADD CONSTRAINT \`FK_48934dd11b1044a85efaa5b8872\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`asisten_praktikum\` DROP FOREIGN KEY \`FK_48934dd11b1044a85efaa5b8872\``
    );
    await queryRunner.query(
      `DROP INDEX \`REL_48934dd11b1044a85efaa5b887\` ON \`asisten_praktikum\``
    );
    await queryRunner.query(`DROP TABLE \`asisten_praktikum\``);
  }
}
