import { IsUUID } from 'class-validator';
import { IsArtistExists } from '../../artists/validators/artist.exists.validator.decorator';
import { FavoriteIdParamAbstract } from './favorite.id-param.abstract.dto';

export class FavoriteArtistIdParamDto extends FavoriteIdParamAbstract {
  @IsUUID()
  @IsArtistExists()
  artistId: string;
}
