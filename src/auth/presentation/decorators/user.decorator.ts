import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { Request } from 'express';

import { UserDto } from '../dtos';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserDto | undefined => {
    const request = ctx.switchToHttp().getRequest<Request>();

    return request.user;
  }
);
