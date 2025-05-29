import { Injectable } from '@nestjs/common';
import { Artist } from './entities/artists.entity';
import { UpdateArtistDto } from './dtos/artist.update.dto';

@Injectable()
export class ArtistsRepository {
  public artists: Artist[];

  constructor() {
    this.artists = [];
  }

  public create(artist: Artist): void {
    this.artists.push(artist);
  }

  public delete(artistId: string): void {
    const artistToDeleteIndex = this.artists.findIndex(
      (artist) => artist.id === artistId,
    );

    this.artists.splice(artistToDeleteIndex, 1);
  }

  public findAll(): Artist[] {
    return this.artists;
  }

  public findById(artistId: string): Artist | null {
    return this.artists.find((artist) => artist.id === artistId);
  }

  public isArtistExists(artistId: string): boolean {
    const artist = this.artists.find((artist) => artist.id === artistId);

    return !!artist;
  }

  public update(artist: Artist, updateArtistDto: UpdateArtistDto): Artist {
    artist.name = updateArtistDto.name ?? artist.name;
    artist.grammy = updateArtistDto.grammy ?? artist.grammy;

    return artist;
  }
}
