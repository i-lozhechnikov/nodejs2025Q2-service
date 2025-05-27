import { Injectable } from '@nestjs/common';
import { Track } from './entities/track.entity';
import { UpdateTrackDto } from './dtos/track.update.dto';

@Injectable()
export class TracksRepository {
  public tracks: Track[];

  constructor() {
    this.tracks = [];
  }

  public create(track: Track): void {
    this.tracks.push(track);
  }

  public delete(trackId: string): void {
    const trackToDeleteIndex = this.tracks.findIndex(
      (track) => track.id === trackId,
    );

    this.tracks.splice(trackToDeleteIndex, 1);
  }

  public findAll(): Track[] {
    return this.tracks;
  }

  public findById(trackId: string): Track | null {
    return this.tracks.find((track) => track.id === trackId);
  }

  public isTrackExists(trackId: string): boolean {
    const track = this.tracks.find((track) => track.id === trackId);

    return !!track;
  }

  public update(track: Track, updateTrackDto: UpdateTrackDto): Track {
    track.name = updateTrackDto.name ?? track.name;
    track.albumId = updateTrackDto.albumId ?? track.albumId;
    track.artistId = updateTrackDto.artistId ?? track.artistId;
    track.duration = updateTrackDto.duration ?? track.duration;

    return track;
  }
}
