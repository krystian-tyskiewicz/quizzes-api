import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1724149073451 implements MigrationInterface {
  name = 'Migration1724149073451';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "password" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "role" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
  }
}
