import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dtos/track.create.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackFactory {
  public create(createTrackDto: CreateTrackDto) {
    const track = new Track();

    track.id = crypto.randomUUID();
    track.name = createTrackDto.name;
    track.albumId = createTrackDto.albumId;
    track.artistId = createTrackDto.artistId;
    track.duration = createTrackDto.duration;

    return track;
  }
}
