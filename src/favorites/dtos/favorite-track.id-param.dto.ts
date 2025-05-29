import { IsUUID } from 'class-validator';
import { IsTrackExists } from '../../tracks/validators/track.exists.validator.decorator';
import { FavoriteIdParamAbstract } from './favorite.id-param.abstract.dto';

export class FavoriteTrackIdParamDto extends FavoriteIdParamAbstract {
  @IsUUID()
  @IsTrackExists()
  trackId: string;
}
