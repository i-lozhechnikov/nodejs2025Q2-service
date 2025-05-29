import { Favorites } from './entities/favorites.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoritesRepository {
  public favorites: Favorites;

  constructor() {
    this.favorites = new Favorites();
  }

  public addAlbum(albumId: string): void {
    if (!this.favorites.albums.find((album) => album === albumId)) {
      this.favorites.albums.push(albumId);
    }
  }

  public addArtist(artistId: string): void {
    if (!this.favorites.artists.find((artist) => artist === artistId)) {
      this.favorites.artists.push(artistId);
    }
  }

  public addTrack(trackId: string): void {
    if (!this.favorites.tracks.find((track) => track === trackId)) {
      this.favorites.tracks.push(trackId);
    }
  }

  public deleteAlbum(albumId: string): void {
    const albumIndex = this.favorites.albums.findIndex(
      (album) => album === albumId,
    );

    if (albumIndex !== -1) {
      this.favorites.albums.splice(albumIndex, 1);
    }
  }

  public deleteArtist(artistId: string): void {
    const artistIndex = this.favorites.artists.findIndex(
      (artist) => artist === artistId,
    );

    if (artistIndex !== -1) {
      this.favorites.artists.splice(artistIndex, 1);
    }
  }

  public deleteTrack(trackId: string): void {
    const trackIndex = this.favorites.tracks.findIndex(
      (track) => track === trackId,
    );

    if (trackIndex !== -1) {
      this.favorites.tracks.splice(trackIndex, 1);
    }
  }

  public getFavorites(): Favorites {
    return this.favorites;
  }
}
