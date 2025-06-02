import { Injectable } from '@nestjs/common';
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
    @InjectRepository(Favorites)
    private readonly favoritesRepository: Repository<Favorites>,
    @InjectRepository(Track)
    private readonly tracksRepository: Repository<Track>,
  ) {}

  public async addAlbum(albumId: string): Promise<void> {
    const favorites = await this.getFavoritesFromDb();

    if (!favorites.albums.find((album) => album === albumId)) {
      favorites.albums.push(albumId);
    }

    await this.favoritesRepository.save(favorites);
  }

  public async addArtist(artistId: string): Promise<void> {
    const favorites = await this.getFavoritesFromDb();

    if (!favorites.artists.find((artist) => artist === artistId)) {
      favorites.artists.push(artistId);
    }

    await this.favoritesRepository.save(favorites);
  }

  public async addTrack(trackId: string): Promise<void> {
    const favorites = await this.getFavoritesFromDb();

    if (!favorites.tracks.find((track) => track === trackId)) {
      favorites.tracks.push(trackId);
    }

    await this.favoritesRepository.save(favorites);
  }

  public async deleteAlbum(albumId: string): Promise<void> {
    const favorites = await this.getFavoritesFromDb();

    const albumIndex = favorites.albums.findIndex((album) => album === albumId);

    if (albumIndex !== -1) {
      favorites.albums.splice(albumIndex, 1);
    }

    await this.favoritesRepository.save(favorites);
  }

  public async deleteArtist(artistId: string): Promise<void> {
    const favorites = await this.getFavoritesFromDb();

    const artistIndex = favorites.artists.findIndex(
      (artist) => artist === artistId,
    );

    if (artistIndex !== -1) {
      favorites.artists.splice(artistIndex, 1);
    }

    await this.favoritesRepository.save(favorites);
  }

  public async deleteTrack(trackId: string): Promise<void> {
    const favorites = await this.getFavoritesFromDb();

    const trackIndex = favorites.tracks.findIndex((track) => track === trackId);

    if (trackIndex !== -1) {
      favorites.tracks.splice(trackIndex, 1);
    }

    await this.favoritesRepository.save(favorites);
  }

  public async getFavorites(): Promise<FavoritesResponse> {
    const favorites = await this.getFavoritesFromDb();

    return await this.fillFavorites(favorites);
  }

  public async getFavoritesFromDb(): Promise<Favorites> {
    const favorites = await this.favoritesRepository.find();

    return favorites[0];
  }

  public async saveFavorites(favorites: Favorites): Promise<void> {
    await this.favoritesRepository.save(favorites);
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
