import { IsOptional } from 'class-validator';

export class RefreshTokenInput {
  @IsOptional()
  refreshToken: string;
}
