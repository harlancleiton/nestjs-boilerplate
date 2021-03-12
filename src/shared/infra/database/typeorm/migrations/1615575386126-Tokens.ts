import { MigrationInterface, QueryRunner } from 'typeorm';

export class Tokens1615575386126 implements MigrationInterface {
  name = 'Tokens1615575386126';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "tokens_type_enum" AS ENUM('jwt_refresh_token', 'forgot_password')`
    );

    await queryRunner.query(
      `CREATE TABLE "tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
      "token" uuid NOT NULL, 
      "type" "tokens_type_enum" NOT NULL, 
      "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
      "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
      "user_id" uuid, 
      CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))`
    );

    await queryRunner.query(
      `ALTER TABLE "tokens" ADD CONSTRAINT "FK_8769073e38c365f315426554ca5" 
      FOREIGN KEY ("user_id") REFERENCES "users"("id") 
      ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tokens" DROP CONSTRAINT "FK_8769073e38c365f315426554ca5"`
    );

    await queryRunner.query(`DROP TABLE "tokens"`);

    await queryRunner.query(`DROP TYPE "tokens_type_enum"`);
  }
}
