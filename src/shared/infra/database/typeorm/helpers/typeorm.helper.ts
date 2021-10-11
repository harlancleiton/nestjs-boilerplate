import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';

import { Connection, EntityTarget, Repository } from 'typeorm';

@Injectable()
export class TypeOrmHelper {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async connect(): Promise<void> {
    this.connection.connect();
  }

  async disconnect(): Promise<void> {
    await this.connection.close();
  }

  async clear(): Promise<void> {
    for (const entity of this.entities) {
      const repository = this.getRepository(entity);

      await repository.delete({});
    }
  }

  getRepository<T>(target: EntityTarget<T>): Repository<T> {
    return this.connection.getRepository(target);
  }

  private get entities(): string[] {
    const entities = this.connection.entityMetadatas.map(entity => entity.name);

    return entities;
  }
}
