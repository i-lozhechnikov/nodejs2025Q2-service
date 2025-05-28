import { Injectable } from '@nestjs/common';
import { AlbumsRepository } from './albums.repository';
import { CreateAlbumDto } from './dtos/album.create.dto';
import { Album } from './entities/album.entity';
import { UpdateAlbumDto } from './dtos/album.update.dto';
import { AlbumFactory } from './album.factory';
import { TracksRepository } from '../tracks/tracks.repository';
import { FavoritesRepository } from '../favorites/favorites.repository';

@Injectable()
export class AlbumsService {
  constructor(
    private readonly albumFactory: AlbumFactory,
    private readonly albumsRepository: AlbumsRepository,
    private readonly favoritesRepository: FavoritesRepository,
    private readonly tracksRepository: TracksRepository,
  ) {}

  public createAlbum(createAlbumDto: CreateAlbumDto): Album {
    const album = this.albumFactory.create(createAlbumDto);

    this.albumsRepository.create(album);

    return album;
  }

  public deleteAlbum(albumId: string): void {
    this.albumsRepository.delete(albumId);

    this.deleteAlbumRelations(albumId);
  }

  public getAlbum(albumId: string): Album {
    return this.albumsRepository.findById(albumId);
  }

  public getAlbums(): Album[] {
    return this.albumsRepository.findAll();
  }

  public updateAlbum(albumId: string, updateAlbumDto: UpdateAlbumDto): Album {
    const album = this.albumsRepository.findById(albumId);

    return this.albumsRepository.update(album, updateAlbumDto);
  }

  private deleteAlbumRelations(albumId: string) {
    this.tracksRepository.tracks.map((track) => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    });

    this.favoritesRepository.favorites.albums =
      this.favoritesRepository.favorites.albums.filter(
        (album) => album !== albumId,
      );
  }
}
