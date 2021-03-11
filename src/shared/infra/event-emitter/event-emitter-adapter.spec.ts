import { Test, TestingModule } from '@nestjs/testing';

import { EventEmitterAdapter } from './event-emitter-adapter';

describe('EventEmitterAdapter', () => {
  let sut: EventEmitterAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventEmitterAdapter]
    }).compile();

    sut = module.get(EventEmitterAdapter);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
