import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTokens1632571971791 implements MigrationInterface {
  name = 'UserTokens1632571971791';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "user_tokens_type_enum" AS ENUM('refresh_access_token', 'forgot_password')`
    );

    await queryRunner.query(
      `CREATE TABLE "user_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
      "token" uuid NOT NULL, "type" "user_tokens_type_enum" NOT NULL, 
      "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
      "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
      "user_id" uuid, CONSTRAINT "PK_63764db9d9aaa4af33e07b2f4bf" PRIMARY KEY ("id"))`
    );

    await queryRunner.query(
      `ALTER TABLE "user_tokens" ADD CONSTRAINT "FK_9e144a67be49e5bba91195ef5de" 
      FOREIGN KEY ("user_id") REFERENCES "users"("id") 
      ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_tokens" DROP CONSTRAINT "FK_9e144a67be49e5bba91195ef5de"`
    );

    await queryRunner.query(`DROP TABLE "user_tokens"`);

    await queryRunner.query(`DROP TYPE "user_tokens_type_enum"`);
  }
}
