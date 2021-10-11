import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';

import { DatabaseConstants } from '~/shared/constants';

import { DatabaseTransaction } from '../protocols';

@Injectable()
export class TransactionManagerInterceptor implements NestInterceptor {
  constructor(
    @Inject(DatabaseConstants.DATABASE_TRANSACTION)
    private readonly databaseTransaction: DatabaseTransaction
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Promise<Observable<any>> {
    await this.databaseTransaction.startTransaction();

    return next.handle().pipe(
      tap(async () => {
        await this.databaseTransaction.commitTransaction();
      }),
      catchError(async error => {
        await this.databaseTransaction.rollbackTransaction();
        throw error;
      }),
      finalize(async () => {
        await this.databaseTransaction.closeTransaction();
      })
    );
  }
}
