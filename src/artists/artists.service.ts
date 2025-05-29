import { Injectable } from '@nestjs/common';
import { ArtistsRepository } from './artists.repository';
import { Artist } from './entities/artists.entity';
import { CreateArtistDto } from './dtos/artist.create.dto';
import { UpdateArtistDto } from './dtos/artist.update.dto';
import { ArtistFactory } from './artist.factory';
import { TracksRepository } from '../tracks/tracks.repository';
import { AlbumsRepository } from '../albums/albums.repository';
import { FavoritesRepository } from '../favorites/favorites.repository';

@Injectable()
export class ArtistsService {
  constructor(
    private readonly albumsRepository: AlbumsRepository,
    private readonly artistFactory: ArtistFactory,
    private readonly artistsRepository: ArtistsRepository,
    private readonly tracksRepository: TracksRepository,
    private readonly favoritesRepository: FavoritesRepository,
  ) {}

  public createArtist(createArtistDto: CreateArtistDto): Artist {
    const artist = this.artistFactory.create(createArtistDto);

    this.artistsRepository.create(artist);

    return artist;
  }

  public deleteArtist(artistId: string): void {
    this.artistsRepository.delete(artistId);

    this.deleteArtistRelations(artistId);
  }

  public getArtist(artistId: string): Artist {
    return this.artistsRepository.findById(artistId);
  }

  public getArtists(): Artist[] {
    return this.artistsRepository.findAll();
  }

  public updateArtist(
    artistId: string,
    updateArtistDto: UpdateArtistDto,
  ): Artist {
    const artist = this.artistsRepository.findById(artistId);

    return this.artistsRepository.update(artist, updateArtistDto);
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
