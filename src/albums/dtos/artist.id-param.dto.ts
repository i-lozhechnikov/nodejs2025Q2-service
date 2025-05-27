import { IsUUID } from 'class-validator';
import { IsAlbumExists } from '../validators/album.exists.validator.decorator';

export class AlbumIdParamDto {
  @IsUUID()
  @IsAlbumExists()
  id: string;
}
