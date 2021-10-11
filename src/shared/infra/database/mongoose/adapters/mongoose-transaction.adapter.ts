import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';

import { Connection, ClientSession } from 'mongoose';

import { DatabaseTransaction } from '~/shared/presentation';

@Injectable()
export class MongooseTransactionAdapter implements DatabaseTransaction {
  private session: ClientSession;

  constructor(@InjectConnection() private readonly connection: Connection) {}

  async startTransaction(): Promise<void> {
    this.session = await this.connection.startSession();
    this.session.startTransaction();
  }

  async commitTransaction(): Promise<void> {
    await this.session.commitTransaction();
  }

  async rollbackTransaction(): Promise<void> {
    await this.session.abortTransaction();
  }

  async closeTransaction(): Promise<void> {
    await this.session.endSession();
  }
}
