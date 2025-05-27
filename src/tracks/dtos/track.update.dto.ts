import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { IsArtistExists } from '../../artists/validators/artist.exists.validator.decorator';
import { IsAlbumExists } from '../../albums/validators/album.exists.validator.decorator';

export class UpdateTrackDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsOptional()
  @IsUUID()
  @IsArtistExists()
  public artistId?: string;

  @IsOptional()
  @IsUUID()
  @IsAlbumExists()
  public albumId?: string;

  @IsNumber()
  @IsNotEmpty()
  public duration: number;
}
