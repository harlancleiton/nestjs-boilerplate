import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';

import { Connection, EntityTarget, QueryRunner, Repository } from 'typeorm';

import { DatabaseTransaction } from '~/shared/presentation';

@Injectable()
export class TypeORMTransactionAdapter implements DatabaseTransaction {
  private queryRunner: QueryRunner;

  constructor(@InjectConnection() private readonly connection: Connection) {}

  getRepository<T>(target: EntityTarget<T>): Repository<T> {
    if (this.queryRunner) return this.queryRunner.manager.getRepository(target);

    return this.connection.getRepository(target);
  }

  async startTransaction(): Promise<void> {
    this.queryRunner = this.connection.createQueryRunner();
    await this.queryRunner.startTransaction();
  }

  async commitTransaction(): Promise<void> {
    await this.queryRunner.commitTransaction();
  }

  async rollbackTransaction(): Promise<void> {
    await this.queryRunner.rollbackTransaction();
  }

  async closeTransaction(): Promise<void> {
    await this.queryRunner.release();
  }
}
