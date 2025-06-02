import { Injectable } from '@nestjs/common';
import { FavoritesRepository } from './favorites.repository';
import { Favorites } from './entities/favorites.entity';
import { FavoritesResponse } from './dtos/favorites.response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from '../artists/entities/artists.entity';
import { Repository } from 'typeorm';
import { Album } from '../albums/entities/album.entity';
import { Track } from '../tracks/entities/track.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Album)
    private readonly albumsRepository: Repository<Album>,
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
    private readonly favoritesRepository: FavoritesRepository,
    @InjectRepository(Track)
    private readonly tracksRepository: Repository<Track>,
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
      const album = await this.albumsRepository.findOneBy({ id: albumId });

      favoritesResponse.albums.push(album);
    }

    for (const artistId of favorites.artists) {
      const artist = await this.artistsRepository.findOneBy({ id: artistId });

      favoritesResponse.artists.push(artist);
    }

    for (const trackId of favorites.tracks) {
      const track = await this.tracksRepository.findOneBy({ id: trackId });

      favoritesResponse.tracks.push(track);
    }

    return favoritesResponse;
  }
}
