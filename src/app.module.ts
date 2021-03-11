import { Module } from '@nestjs/common';

import { AuthModule } from '~/auth';
import { SharedModule } from '~/shared';
import { UsersModule } from '~/users';

@Module({
  imports: [AuthModule, SharedModule, UsersModule]
})
export class AppModule {}
