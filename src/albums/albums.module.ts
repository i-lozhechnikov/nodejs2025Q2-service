import { Module } from '@nestjs/common';
import { AlbumFactory } from './album.factory';
import { AlbumsRepository } from './albums.repository';
import { AlbumsService } from './albums.service';
import { IsAlbumExistsConstraint } from './validators/album.exists.validator.constraint';
import { AlbumsController } from './albums.controller';

@Module({
  controllers: [AlbumsController],
  providers: [
    AlbumFactory,
    AlbumsRepository,
    AlbumsService,
    IsAlbumExistsConstraint,
  ],
})
export class AlbumsModule {}
