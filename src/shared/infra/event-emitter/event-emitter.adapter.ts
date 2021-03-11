import { Injectable } from '@nestjs/common';

import { EventEmitter2 } from 'eventemitter2';

import { Event, event, eventNS } from '~/shared/data';

@Injectable()
export class EventEmitterAdapter implements Event {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  emit(event: event | eventNS, ...values: any[]): boolean {
    return this.eventEmitter.emit(event, ...values);
  }

  emitAsync(event: event | eventNS, ...values: any[]): Promise<any[]> {
    return this.eventEmitter.emitAsync(event, ...values);
  }
}
