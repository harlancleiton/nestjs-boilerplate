import { Module } from '@nestjs/common';

import { UsersModule } from '~/users';

@Module({
  imports: [UsersModule]
})
export class AppModule {}
