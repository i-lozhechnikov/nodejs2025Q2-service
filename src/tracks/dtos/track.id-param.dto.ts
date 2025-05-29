import { IsUUID } from 'class-validator';
import { IsTrackExists } from '../validators/track.exists.validator.decorator';

export class TrackIdParamDto {
  @IsUUID()
  @IsTrackExists()
  id: string;
}
