import { IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsTrackExists } from '../../tracks/validators/track.exists.validator.decorator';
import { FavoriteIdParamAbstract } from './favorite.id-param.abstract.dto';

export class FavoriteTrackIdParamDto extends FavoriteIdParamAbstract {
  @IsUUID()
  @IsTrackExists()
  @Transform(({ obj }) => obj.id)
  trackId: string;
}
