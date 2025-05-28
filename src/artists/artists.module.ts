import { forwardRef, Module } from '@nestjs/common';
import { ArtistFactory } from './artist.factory';
import { ArtistsRepository } from './artists.repository';
import { ArtistsService } from './artists.service';
import { IsArtistExistsConstraint } from './validators/artist.exists.validator.constraint';
import { ArtistsController } from './artists.controller';
import { AlbumsModule } from '../albums/albums.module';
import { TracksModule } from '../tracks/tracks.module';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  imports: [
    forwardRef(() => AlbumsModule),
    forwardRef(() => FavoritesModule),
    TracksModule,
  ],
  controllers: [ArtistsController],
  providers: [
    ArtistFactory,
    ArtistsRepository,
    ArtistsService,
    IsArtistExistsConstraint,
  ],
  exports: [ArtistsRepository, IsArtistExistsConstraint],
})
export class ArtistsModule {}
