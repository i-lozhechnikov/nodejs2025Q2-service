import { IsUUID } from 'class-validator';
import { IsAlbumExists } from '../../albums/validators/album.exists.validator.decorator';
import { Transform } from 'class-transformer';
import { FavoriteIdParamAbstract } from './favorite.id-param.abstract.dto';

export class FavoriteAlbumIdParamDto extends FavoriteIdParamAbstract {
  @IsUUID()
  @IsAlbumExists()
  @Transform(({ obj }) => obj.id)
  albumId: string;
}
