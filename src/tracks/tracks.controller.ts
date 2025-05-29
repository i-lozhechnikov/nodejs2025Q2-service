import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Injectable,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dtos/track.create.dto';
import { Track } from './entities/track.entity';
import { TrackIdParamDto } from './dtos/track.id-param.dto';
import { UpdateTrackDto } from './dtos/track.update.dto';

@Injectable()
@Controller('/track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public createTrack(@Body() createTrackDto: CreateTrackDto): Track {
    return this.tracksService.createTrack(createTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteTrack(@Param() trackIdParamDto: TrackIdParamDto): void {
    return this.tracksService.deleteTrack(trackIdParamDto.id);
  }

  @Get(':id')
  public getTrack(@Param() trackIdParamDto: TrackIdParamDto): Track {
    return this.tracksService.getTrack(trackIdParamDto.id);
  }

  @Get()
  public getTracks(): Track[] {
    return this.tracksService.getTracks();
  }

  @Put(':id')
  public updateTrack(
    @Param() trackIdParamDto: TrackIdParamDto,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Track {
    return this.tracksService.updateTrack(trackIdParamDto.id, updateTrackDto);
  }
}
