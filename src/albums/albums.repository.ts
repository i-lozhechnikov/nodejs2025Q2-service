import { Injectable } from '@nestjs/common';
import { Album } from './entities/album.entity';
import { UpdateAlbumDto } from './dtos/album.update.dto';

@Injectable()
export class AlbumsRepository {
  public albums: Album[];

  constructor() {
    this.albums = [];
  }

  public create(album: Album): void {
    this.albums.push(album);
  }

  public delete(albumId: string): void {
    const albumToDeleteIndex = this.albums.findIndex(
      (album) => album.id === albumId,
    );

    this.albums.splice(albumToDeleteIndex, 1);
  }

  public findAll(): Album[] {
    return this.albums;
  }

  public findById(albumId: string): Album | null {
    return this.albums.find((album) => album.id === albumId);
  }

  public isAlbumExists(albumId: string): boolean {
    const album = this.albums.find((album) => album.id === albumId);

    return !!album;
  }

  public update(album: Album, updateAlbumDto: UpdateAlbumDto): Album {
    album.name = updateAlbumDto.name ?? album.name;
    album.year = updateAlbumDto.year ?? album.year;
    album.artistId = updateAlbumDto.artistId ?? album.artistId;

    return album;
  }
}
