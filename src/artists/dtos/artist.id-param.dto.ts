import { IsUUID } from 'class-validator';
import { IsArtistExists } from '../validators/artist.exists.validator.decorator';

export class ArtistIdParamDto {
  @IsUUID()
  @IsArtistExists()
  id: string;
}
