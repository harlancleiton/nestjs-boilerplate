import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { UserDto } from '../dtos';

export const GqlUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserDto | undefined => {
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().req.user;
  }
);
