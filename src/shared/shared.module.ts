import { Global, Module } from '@nestjs/common';

import { BCryptAdapter } from './infra';

@Global()
@Module({ providers: [BCryptAdapter] })
export class SharedModule {}
