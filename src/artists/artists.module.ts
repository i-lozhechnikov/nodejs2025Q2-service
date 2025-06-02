import { forwardRef, Module } from '@nestjs/common';
import { ArtistFactory } from './artist.factory';
import { ArtistsService } from './artists.service';
import { IsArtistExistsConstraint } from './validators/artist.exists.validator.constraint';
import { ArtistsController } from './artists.controller';
import { AlbumsModule } from '../albums/albums.module';
import { TracksModule } from '../tracks/tracks.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './entities/artists.entity';

@Module({
  imports: [
    forwardRef(() => AlbumsModule),
    forwardRef(() => FavoritesModule),
    TracksModule,
    TypeOrmModule.forFeature([Artist]),
  ],
  controllers: [ArtistsController],
  providers: [ArtistFactory, ArtistsService, IsArtistExistsConstraint],
  exports: [IsArtistExistsConstraint, TypeOrmModule],
})
export class ArtistsModule {}
