import { Injectable } from '@nestjs/common';
import { ArtistsRepository } from './artists.repository';
import { Artist } from './entities/artists.entity';
import { CreateArtistDto } from './dtos/artist.create.dto';
import { UpdateArtistDto } from './dtos/artist.update.dto';
import { ArtistFactory } from './artist.factory';

@Injectable()
export class ArtistsService {
  constructor(
    private readonly artistFactory: ArtistFactory,
    private readonly artistsRepository: ArtistsRepository,
  ) {}

  public createArtist(createArtistDto: CreateArtistDto): Artist {
    const artist = this.artistFactory.create(createArtistDto);

    this.artistsRepository.create(artist);

    return artist;
  }

  public deleteArtist(artistId: string): void {
    this.artistsRepository.delete(artistId);
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
}
