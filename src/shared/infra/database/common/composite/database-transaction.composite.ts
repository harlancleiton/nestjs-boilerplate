import { Injectable } from '@nestjs/common';

import { DatabaseTransaction } from '~/shared/presentation';

@Injectable()
export class DatabaseTransactionComposite implements DatabaseTransaction {
  private readonly children: DatabaseTransaction[] = [];

  constructor(...children: DatabaseTransaction[]) {
    this.children.push(...children);
  }

  add(child: DatabaseTransaction): void {
    this.children.push(child);
  }

  remove(databaseTransaction: DatabaseTransaction): void {
    const childIndex = this.children.indexOf(databaseTransaction);
    if (childIndex >= 0) this.children.splice(childIndex, 1);
  }

  async startTransaction(): Promise<void> {
    await Promise.all(this.children.map(child => child.startTransaction()));
  }

  async commitTransaction(): Promise<void> {
    await Promise.all(this.children.map(child => child.commitTransaction()));
  }

  async rollbackTransaction(): Promise<void> {
    await Promise.all(this.children.map(child => child.rollbackTransaction()));
  }

  async closeTransaction(): Promise<void> {
    await Promise.all(this.children.map(child => child.closeTransaction()));
  }
}
