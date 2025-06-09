import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dtos/album.create.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumFactory {
  public create(createAlbumDto: CreateAlbumDto) {
    const album = new Album();

    album.name = createAlbumDto.name;
    album.year = createAlbumDto.year;
    album.artistId = createAlbumDto.artistId;

    return album;
  }
}
