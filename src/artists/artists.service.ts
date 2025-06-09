import { Injectable } from '@nestjs/common';
import { Artist } from './entities/artists.entity';
import { CreateArtistDto } from './dtos/artist.create.dto';
import { UpdateArtistDto } from './dtos/artist.update.dto';
import { ArtistFactory } from './artist.factory';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from '../albums/entities/album.entity';
import { Track } from '../tracks/entities/track.entity';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumsRepository: Repository<Album>,
    private readonly artistFactory: ArtistFactory,
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
    @InjectRepository(Track)
    private readonly tracksRepository: Repository<Track>,
    private readonly favoritesService: FavoritesService,
  ) {}

  public async createArtist(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist = this.artistFactory.create(createArtistDto);

    await this.artistsRepository.save(artist);

    return artist;
  }

  public async deleteArtist(artistId: string): Promise<void> {
    await this.artistsRepository.delete(artistId);

    await this.deleteArtistRelations(artistId);
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

  private async deleteArtistRelations(artistId: string) {
    const tracks = await this.tracksRepository.find({
      where: {
        artistId: artistId,
      },
    });

    for (const track of tracks) {
      track.artistId = null;

      await this.tracksRepository.save(track);
    }

    const albums = await this.albumsRepository.find({
      where: {
        artistId: artistId,
      },
    });

    for (const album of albums) {
      album.artistId = null;

      await this.albumsRepository.save(album);
    }

    const favorites = await this.favoritesService.getFavoritesFromDb();

    favorites.artists = favorites.artists.filter(
      (artist) => artist.id !== artistId,
    );

    await this.favoritesService.saveFavorites(favorites);
  }
}
