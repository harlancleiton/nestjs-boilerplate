import { Test, TestingModule } from '@nestjs/testing';

import { EventEmitter2 } from 'eventemitter2';

import { factories } from '~/test/factories';

import { EventEmitterAdapter } from './event-emitter-adapter';

describe('EventEmitterAdapter', () => {
  const eventEmitterMock = () => ({ emit: jest.fn(), emitAsync: jest.fn() });

  let sut: EventEmitterAdapter;
  let eventEmitter: EventEmitter2;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventEmitterAdapter,
        { provide: EventEmitter2, useFactory: eventEmitterMock }
      ]
    }).compile();

    sut = module.get(EventEmitterAdapter);
    eventEmitter = module.get(EventEmitter2);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should call EventEmitter.emit with correct values', () => {
    jest.spyOn(eventEmitter, 'emit');

    const event = factories.faker.lorem.word();
    const eventValue = factories.userModel.build();

    sut.emit(event, eventValue);

    expect(eventEmitter.emit).toBeCalledWith(event, eventValue);
  });

  it('should call EventEmitter.emitAsync with correct values', async () => {
    jest.spyOn(eventEmitter, 'emitAsync');

    const event = factories.faker.lorem.word();
    const eventValue = factories.userModel.build();

    await sut.emitAsync(event, eventValue);

    expect(eventEmitter.emitAsync).toBeCalledWith(event, eventValue);
  });
});
