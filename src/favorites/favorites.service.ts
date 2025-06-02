import { Injectable } from '@nestjs/common';
import { FavoritesRepository } from './favorites.repository';
import { Favorites } from './entities/favorites.entity';
import { FavoritesResponse } from './dtos/favorites.response.dto';
import { AlbumsRepository } from '../albums/albums.repository';
import { TracksRepository } from '../tracks/tracks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from '../artists/entities/artists.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly albumsRepository: AlbumsRepository,
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
    private readonly favoritesRepository: FavoritesRepository,
    private readonly tracksRepository: TracksRepository,
  ) {}

  public addAlbum(albumId: string): void {
    this.favoritesRepository.addAlbum(albumId);
  }

  public addArtist(artistId: string): void {
    this.favoritesRepository.addArtist(artistId);
  }

  public addTrack(trackId: string): void {
    this.favoritesRepository.addTrack(trackId);
  }

  public deleteAlbum(albumId: string): void {
    this.favoritesRepository.deleteAlbum(albumId);
  }

  public deleteArtist(artistId: string): void {
    this.favoritesRepository.deleteArtist(artistId);
  }

  public deleteTrack(trackId: string): void {
    this.favoritesRepository.deleteTrack(trackId);
  }

  public async getFavorites(): Promise<FavoritesResponse> {
    const favorites = this.favoritesRepository.getFavorites();

    return await this.fillFavorites(favorites);
  }

  private async fillFavorites(
    favorites: Favorites,
  ): Promise<FavoritesResponse> {
    const favoritesResponse = new FavoritesResponse();

    for (const albumId of favorites.albums) {
      favoritesResponse.albums.push(this.albumsRepository.findById(albumId));
    }

    for (const artistId of favorites.artists) {
      const artist = await this.artistsRepository.findOneBy({ id: artistId });

      favoritesResponse.artists.push(artist);
    }

    for (const trackId of favorites.tracks) {
      favoritesResponse.tracks.push(this.tracksRepository.findById(trackId));
    }

    return favoritesResponse;
  }
}
