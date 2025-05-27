import { Injectable } from '@nestjs/common';
import { AlbumsRepository } from './albums.repository';
import { CreateAlbumDto } from './dtos/album.create.dto';
import { Album } from './entities/album.entity';
import { UpdateAlbumDto } from './dtos/album.update.dto';
import { AlbumFactory } from './album.factory';

@Injectable()
export class AlbumsService {
  constructor(
    private readonly albumFactory: AlbumFactory,
    private readonly albumsRepository: AlbumsRepository,
  ) {}

  public createAlbum(createAlbumDto: CreateAlbumDto): Album {
    const album = this.albumFactory.create(createAlbumDto);

    this.albumsRepository.create(album);

    return album;
  }

  public deleteAlbum(albumId: string): void {
    this.albumsRepository.delete(albumId);
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
}
