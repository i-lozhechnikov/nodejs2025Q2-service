import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dtos/artist.create.dto';
import { Artist } from './entities/artists.entity';

@Injectable()
export class ArtistFactory {
  public create(createArtistDto: CreateArtistDto) {
    const artist = new Artist();

    artist.name = createArtistDto.name;
    artist.grammy = createArtistDto.grammy;

    return artist;
  }
}
