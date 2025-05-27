import { Module } from '@nestjs/common';
import { AlbumFactory } from './album.factory';
import { AlbumsRepository } from './albums.repository';
import { AlbumsService } from './albums.service';
import { IsAlbumExistsConstraint } from './validators/album.exists.validator.constraint';
import { AlbumsController } from './albums.controller';
import { TracksModule } from '../tracks/tracks.module';

@Module({
  imports: [TracksModule],
  controllers: [AlbumsController],
  providers: [
    AlbumFactory,
    AlbumsRepository,
    AlbumsService,
    IsAlbumExistsConstraint,
  ],
  exports: [AlbumsRepository],
})
export class AlbumsModule {}
