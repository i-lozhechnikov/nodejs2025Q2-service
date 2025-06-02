import { forwardRef, Module } from '@nestjs/common';

import { TracksController } from './tracks.controller';
import { TrackFactory } from './track.factory';
import { TracksService } from './tracks.service';
import { IsTrackExistsConstraint } from './validators/track.exists.validator.constraint';
import { FavoritesModule } from '../favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Track]),
    forwardRef(() => FavoritesModule),
  ],
  controllers: [TracksController],
  providers: [TrackFactory, TracksService, IsTrackExistsConstraint],
  exports: [IsTrackExistsConstraint, TypeOrmModule],
})
export class TracksModule {}
