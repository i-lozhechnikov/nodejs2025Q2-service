import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dtos/album.create.dto';
import { Album } from './entities/album.entity';
import { UpdateAlbumDto } from './dtos/album.update.dto';
import { AlbumFactory } from './album.factory';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoritesService } from '../favorites/favorites.service';
import { Track } from '../tracks/entities/track.entity';

@Injectable()
export class AlbumsService {
  constructor(
    private readonly albumFactory: AlbumFactory,
    @InjectRepository(Album)
    private readonly albumsRepository: Repository<Album>,
    private readonly favoritesService: FavoritesService,
    @InjectRepository(Track)
    private readonly tracksRepository: Repository<Track>,
  ) {}

  public async createAlbum(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const album = this.albumFactory.create(createAlbumDto);

    await this.albumsRepository.save(album);

    return album;
  }

  public async deleteAlbum(albumId: string): Promise<void> {
    await this.albumsRepository.delete(albumId);

    await this.deleteAlbumRelations(albumId);
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

  private async deleteAlbumRelations(albumId: string) {
    const tracks = await this.tracksRepository.find({
      where: {
        albumId: albumId,
      },
    });

    for (const track of tracks) {
      track.albumId = null;

      await this.tracksRepository.save(track);
    }

    const favorites = await this.favoritesService.getFavoritesFromDb();

    favorites.albums = favorites.albums.filter((album) => album !== albumId);

    await this.favoritesService.saveFavorites(favorites);
  }
}
