import { IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  public grammy: boolean;
}
