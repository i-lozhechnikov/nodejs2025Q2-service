import { Module } from '@nestjs/common';
import { ArtistFactory } from './artist.factory';
import { ArtistsRepository } from './artists.repository';
import { ArtistsService } from './artists.service';
import { IsArtistExistsConstraint } from './validators/artist.exists.validator.constraint';
import { ArtistsController } from './artists.controller';
import { AlbumsModule } from '../albums/albums.module';
import { TracksModule } from '../tracks/tracks.module';

@Module({
  imports: [AlbumsModule, TracksModule],
  controllers: [ArtistsController],
  providers: [
    ArtistFactory,
    ArtistsRepository,
    ArtistsService,
    IsArtistExistsConstraint,
  ],
})
export class ArtistsModule {}
