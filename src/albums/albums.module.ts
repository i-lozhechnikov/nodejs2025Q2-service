import { forwardRef, Module } from '@nestjs/common';
import { AlbumFactory } from './album.factory';
import { AlbumsService } from './albums.service';
import { IsAlbumExistsConstraint } from './validators/album.exists.validator.constraint';
import { AlbumsController } from './albums.controller';
import { TracksModule } from '../tracks/tracks.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Album]),
    forwardRef(() => FavoritesModule),
    TracksModule,
  ],
  controllers: [AlbumsController],
  providers: [AlbumFactory, AlbumsService, IsAlbumExistsConstraint],
  exports: [IsAlbumExistsConstraint, TypeOrmModule],
})
export class AlbumsModule {}
