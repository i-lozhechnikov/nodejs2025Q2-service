import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dtos/album.create.dto';
import { Album } from './entities/album.entity';
import { UpdateAlbumDto } from './dtos/album.update.dto';
import { AlbumFactory } from './album.factory';
import { TracksRepository } from '../tracks/tracks.repository';
import { FavoritesRepository } from '../favorites/favorites.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    private readonly albumFactory: AlbumFactory,
    @InjectRepository(Album)
    private readonly albumsRepository: Repository<Album>,
    private readonly favoritesRepository: FavoritesRepository,
    private readonly tracksRepository: TracksRepository,
  ) {}

  public async createAlbum(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const album = this.albumFactory.create(createAlbumDto);

    await this.albumsRepository.save(album);

    return album;
  }

  public async deleteAlbum(albumId: string): Promise<void> {
    await this.albumsRepository.delete(albumId);

    this.deleteAlbumRelations(albumId);
  }

  public async getAlbum(albumId: string): Promise<Album> {
    return await this.albumsRepository.findOneBy({ id: albumId });
  }

  public async getAlbums(): Promise<Album[]> {
    return await this.albumsRepository.find();
  }

  public async updateAlbum(
    albumId: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    const album = await this.albumsRepository.findOneBy({ id: albumId });

    album.name = updateAlbumDto.name ?? album.name;
    album.year = updateAlbumDto.year ?? album.year;
    album.artistId = updateAlbumDto.artistId ?? album.artistId;

    return await this.albumsRepository.save(album);
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
