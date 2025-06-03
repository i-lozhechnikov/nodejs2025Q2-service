import { Injectable } from '@nestjs/common';

import { TrackFactory } from './track.factory';
import { CreateTrackDto } from './dtos/track.create.dto';
import { UpdateTrackDto } from './dtos/track.update.dto';
import { Track } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class TracksService {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly trackFactory: TrackFactory,
    @InjectRepository(Track)
    private readonly tracksRepository: Repository<Track>,
  ) {}

  public async createTrack(createTrackDto: CreateTrackDto): Promise<Track> {
    const track = this.trackFactory.create(createTrackDto);

    await this.tracksRepository.save(track);

    return track;
  }

  public async deleteTrack(trackId: string): Promise<void> {
    await this.tracksRepository.delete(trackId);

    await this.deleteTrackRelations(trackId);
  }

  public async getTrack(trackId: string): Promise<Track> {
    return await this.tracksRepository.findOneBy({ id: trackId });
  }

  public async getTracks(): Promise<Track[]> {
    return await this.tracksRepository.find();
  }

  public async updateTrack(
    trackId: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    const track = await this.tracksRepository.findOneBy({ id: trackId });

    track.name = updateTrackDto.name ?? track.name;
    track.albumId = updateTrackDto.albumId ?? track.albumId;
    track.artistId = updateTrackDto.artistId ?? track.artistId;
    track.duration = updateTrackDto.duration ?? track.duration;

    return await this.tracksRepository.save(track);
  }

  private async deleteTrackRelations(trackId: string): Promise<void> {
    const favorites = await this.favoritesService.getFavoritesFromDb();

    favorites.tracks = favorites.tracks.filter((track) => track !== trackId);

    await this.favoritesService.saveFavorites(favorites);
  }
}
