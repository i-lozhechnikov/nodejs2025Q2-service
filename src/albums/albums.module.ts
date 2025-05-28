import { forwardRef, Module } from '@nestjs/common';
import { AlbumFactory } from './album.factory';
import { AlbumsRepository } from './albums.repository';
import { AlbumsService } from './albums.service';
import { IsAlbumExistsConstraint } from './validators/album.exists.validator.constraint';
import { AlbumsController } from './albums.controller';
import { TracksModule } from '../tracks/tracks.module';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  imports: [forwardRef(() => FavoritesModule), TracksModule],
  controllers: [AlbumsController],
  providers: [
    AlbumFactory,
    AlbumsRepository,
    AlbumsService,
    IsAlbumExistsConstraint,
  ],
  exports: [AlbumsRepository, IsAlbumExistsConstraint],
})
export class AlbumsModule {}
