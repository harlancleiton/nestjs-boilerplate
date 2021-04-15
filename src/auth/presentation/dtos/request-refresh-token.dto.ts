import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Expose()
export class RequestRefreshTokenDto {
  @IsString()
  refreshToken: string;

  constructor(partial: Partial<RequestRefreshTokenDto>) {
    Object.assign(this, partial);
  }
}
