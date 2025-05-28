import { forwardRef, Module } from '@nestjs/common';

import { TracksController } from './tracks.controller';
import { TrackFactory } from './track.factory';
import { TracksRepository } from './tracks.repository';
import { TracksService } from './tracks.service';
import { IsTrackExistsConstraint } from './validators/track.exists.validator.constraint';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  imports: [forwardRef(() => FavoritesModule)],
  controllers: [TracksController],
  providers: [
    TrackFactory,
    TracksRepository,
    TracksService,
    IsTrackExistsConstraint,
  ],
  exports: [TracksRepository, IsTrackExistsConstraint],
})
export class TracksModule {}
