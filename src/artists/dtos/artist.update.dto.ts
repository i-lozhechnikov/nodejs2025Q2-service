import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateArtistDto {
  @IsOptional()
  @IsString()
  public name?: string;

  @IsOptional()
  @IsBoolean()
  public grammy?: boolean;
}
