import { Injectable } from '@nestjs/common';
import { FavoritesRepository } from './favorites.repository';
import { Favorites } from './entities/favorites.entity';
import { FavoritesResponse } from './dtos/favorites.response.dto';
import { AlbumsRepository } from '../albums/albums.repository';
import { ArtistsRepository } from '../artists/artists.repository';
import { TracksRepository } from '../tracks/tracks.repository';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly albumsRepository: AlbumsRepository,
    private readonly artistsRepository: ArtistsRepository,
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

  public getFavorites(): FavoritesResponse {
    const favorites = this.favoritesRepository.getFavorites();

    return this.fillFavorites(favorites);
  }

  private fillFavorites(favorites: Favorites): FavoritesResponse {
    const favoritesResponse = new FavoritesResponse();

    for (const albumId of favorites.albums) {
      favoritesResponse.albums.push(this.albumsRepository.findById(albumId));
    }

    for (const artistId of favorites.artists) {
      favoritesResponse.artists.push(this.artistsRepository.findById(artistId));
    }

    for (const trackId of favorites.tracks) {
      favoritesResponse.tracks.push(this.tracksRepository.findById(trackId));
    }

    return favoritesResponse;
  }
}
