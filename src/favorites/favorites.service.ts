import { Injectable } from '@nestjs/common';
import { Favorites } from './entities/favorites.entity';
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

    const albumExists = favorites.artists.some((album) => album.id === albumId);
    if (albumExists) {
      return;
    }

    const album = await this.albumsRepository.findOneBy({ id: albumId });

    favorites.albums.push(album);

    await this.favoritesRepository.save(favorites);
  }

  public async addArtist(artistId: string): Promise<void> {
    const favorites = await this.getFavoritesFromDb();

    const artistExists = favorites.artists.some(
      (artist) => artist.id === artistId,
    );
    if (artistExists) {
      return;
    }

    const artist = await this.artistsRepository.findOneBy({ id: artistId });

    favorites.artists.push(artist);

    await this.favoritesRepository.save(favorites);
  }

  public async addTrack(trackId: string): Promise<void> {
    const favorites = await this.getFavoritesFromDb();

    const trackExists = favorites.tracks.some((track) => track.id === trackId);
    if (trackExists) {
      return;
    }

    const track = await this.tracksRepository.findOneBy({ id: trackId });

    favorites.tracks.push(track);

    await this.favoritesRepository.save(favorites);
  }

  public async deleteAlbum(albumId: string): Promise<void> {
    const favorites = await this.getFavoritesFromDb();

    const albumIndex = favorites.albums.findIndex(
      (album) => album.id === albumId,
    );

    if (albumIndex !== -1) {
      favorites.albums.splice(albumIndex, 1);

      await this.favoritesRepository.save(favorites);
    }
  }

  public async deleteArtist(artistId: string): Promise<void> {
    const favorites = await this.getFavoritesFromDb();

    const artistIndex = favorites.artists.findIndex(
      (artist) => artist.id === artistId,
    );

    if (artistIndex !== -1) {
      favorites.artists.splice(artistIndex, 1);

      await this.favoritesRepository.save(favorites);
    }
  }

  public async deleteTrack(trackId: string): Promise<void> {
    const favorites = await this.getFavoritesFromDb();

    const trackIndex = favorites.tracks.findIndex(
      (track) => track.id === trackId,
    );

    if (trackIndex !== -1) {
      favorites.tracks.splice(trackIndex, 1);

      await this.favoritesRepository.save(favorites);
    }
  }

  public async getFavorites(): Promise<Favorites> {
    return await this.getFavoritesFromDb();
  }

  public async getFavoritesFromDb(): Promise<Favorites> {
    const favorites = await this.favoritesRepository.find({
      relations: ['tracks', 'albums', 'artists'],
    });

    return favorites[0];
  }

  public async saveFavorites(favorites: Favorites): Promise<void> {
    await this.favoritesRepository.save(favorites);
  }
}
