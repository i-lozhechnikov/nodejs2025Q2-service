import { Module } from '@nestjs/common';

import { TracksController } from './tracks.controller';
import { TrackFactory } from './track.factory';
import { TracksRepository } from './tracks.repository';
import { TracksService } from './tracks.service';
import { IsTrackExistsConstraint } from './validators/track.exists.validator.constraint';

@Module({
  controllers: [TracksController],
  providers: [
    TrackFactory,
    TracksRepository,
    TracksService,
    IsTrackExistsConstraint,
  ],
})
export class TracksModule {}
