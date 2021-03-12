import { UserDto } from '~/auth/presentation/dtos';

declare module 'express-serve-static-core' {
  export interface Request {
    user?: UserDto;
  }
}
