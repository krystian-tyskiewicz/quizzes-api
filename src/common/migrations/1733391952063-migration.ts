import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1733391952063 implements MigrationInterface {
  name = 'Migration1733391952063';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_quiz" ("id" SERIAL NOT NULL, "quizId" integer, "userId" integer, CONSTRAINT "PK_9fdb0b0acc452e256cbfb7f9040" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_answer" ("id" SERIAL NOT NULL, "userQuizId" integer, "questionId" integer, "answerId" integer, CONSTRAINT "PK_37b32f666e59572775b1b020fb5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quiz" ADD CONSTRAINT "FK_3a6c5188a5d0fdc3c55f087cdcc" FOREIGN KEY ("quizId") REFERENCES "quiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quiz" ADD CONSTRAINT "FK_ac373cc6866e0323192c662cae9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_answer" ADD CONSTRAINT "FK_92c13aadde6bf48a6b97e56e203" FOREIGN KEY ("userQuizId") REFERENCES "user_quiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_answer" ADD CONSTRAINT "FK_39bb21c637a8c11e2f3abd527e6" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_answer" ADD CONSTRAINT "FK_1940f9d25a60d83036e5f752093" FOREIGN KEY ("answerId") REFERENCES "answer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_answer" DROP CONSTRAINT "FK_1940f9d25a60d83036e5f752093"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_answer" DROP CONSTRAINT "FK_39bb21c637a8c11e2f3abd527e6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_answer" DROP CONSTRAINT "FK_92c13aadde6bf48a6b97e56e203"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quiz" DROP CONSTRAINT "FK_ac373cc6866e0323192c662cae9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quiz" DROP CONSTRAINT "FK_3a6c5188a5d0fdc3c55f087cdcc"`,
    );
    await queryRunner.query(`DROP TABLE "user_answer"`);
    await queryRunner.query(`DROP TABLE "user_quiz"`);
  }
}
