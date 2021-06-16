import { GqlJwtAuthGuard } from './gql-jwt-auth.guard';

describe('JwtAuthGuard', () => {
  it('should be defined', () => {
    expect(new GqlJwtAuthGuard()).toBeDefined();
  });
});
