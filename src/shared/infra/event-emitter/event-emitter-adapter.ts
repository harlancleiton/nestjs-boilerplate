import { Injectable } from '@nestjs/common';

import { Event, event, eventNS } from '~/shared/data';

@Injectable()
export class EventEmitterAdapter implements Event {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  emit(event: event | eventNS, ...values: any[]): boolean {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  emitAsync(event: event | eventNS, ...values: any[]): Promise<any[]> {
    throw new Error('Method not implemented.');
  }
}
