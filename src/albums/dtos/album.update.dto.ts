import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { IsArtistExists } from '../../artists/validators/artist.exists.validator.decorator';

export class UpdateAlbumDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNumber()
  year: number;

  @IsOptional()
  @IsUUID()
  @IsArtistExists()
  artistId?: string;
}
