import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1680007127581 implements MigrationInterface {
  name = 'Migration1680007127581';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`cat\` (\`idx\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`kind\` varchar(255) NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modifiedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedDate\` datetime(6) NULL, PRIMARY KEY (\`idx\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`cat\``);
  }
}
