import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { UserDto } from '../dtos';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserDto | undefined => {
    const request = ctx.switchToHttp().getRequest();

    return request.user;
  }
);
