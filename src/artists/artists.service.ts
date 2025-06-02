import { Injectable } from '@nestjs/common';
import { Artist } from './entities/artists.entity';
import { CreateArtistDto } from './dtos/artist.create.dto';
import { UpdateArtistDto } from './dtos/artist.update.dto';
import { ArtistFactory } from './artist.factory';
import { TracksRepository } from '../tracks/tracks.repository';
import { AlbumsRepository } from '../albums/albums.repository';
import { FavoritesRepository } from '../favorites/favorites.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    private readonly albumsRepository: AlbumsRepository,
    private readonly artistFactory: ArtistFactory,
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
    private readonly tracksRepository: TracksRepository,
    private readonly favoritesRepository: FavoritesRepository,
  ) {}

  public async createArtist(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist = this.artistFactory.create(createArtistDto);

    await this.artistsRepository.save(artist);

    return artist;
  }

  public async deleteArtist(artistId: string): Promise<void> {
    await this.artistsRepository.delete(artistId);

    this.deleteArtistRelations(artistId);
  }

  public async getArtist(artistId: string): Promise<Artist> {
    return this.artistsRepository.findOneBy({ id: artistId });
  }

  public async getArtists(): Promise<Artist[]> {
    return await this.artistsRepository.find();
  }

  public async updateArtist(
    artistId: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    const artist = await this.artistsRepository.findOneBy({ id: artistId });

    artist.name = updateArtistDto.name ?? artist.name;
    artist.grammy = updateArtistDto.grammy ?? artist.grammy;

    return this.artistsRepository.save(artist);
  }

  private deleteArtistRelations(artistId: string) {
    this.tracksRepository.tracks.map((track) => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    });

    this.albumsRepository.albums.map((album) => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });

    this.favoritesRepository.favorites.artists =
      this.favoritesRepository.favorites.artists.filter(
        (artist) => artist !== artistId,
      );
  }
}
