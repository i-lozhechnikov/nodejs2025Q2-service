import { Injectable } from '@nestjs/common';

import { TrackFactory } from './track.factory';
import { TracksRepository } from './tracks.repository';
import { CreateTrackDto } from './dtos/track.create.dto';
import { UpdateTrackDto } from './dtos/track.update.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService {
  constructor(
    private readonly trackFactory: TrackFactory,
    private readonly tracksRepository: TracksRepository,
  ) {}

  public createTrack(createTrackDto: CreateTrackDto): Track {
    const track = this.trackFactory.create(createTrackDto);

    this.tracksRepository.create(track);

    return track;
  }

  public deleteTrack(trackId: string): void {
    this.tracksRepository.delete(trackId);
  }

  public getTrack(trackId: string): Track {
    return this.tracksRepository.findById(trackId);
  }

  public getTracks(): Track[] {
    return this.tracksRepository.findAll();
  }

  public updateTrack(trackId: string, updateTrackDto: UpdateTrackDto): Track {
    const track = this.tracksRepository.findById(trackId);

    return this.tracksRepository.update(track, updateTrackDto);
  }
}
