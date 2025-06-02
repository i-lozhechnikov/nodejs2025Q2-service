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
  public async createTrack(
    @Body() createTrackDto: CreateTrackDto,
  ): Promise<Track> {
    return await this.tracksService.createTrack(createTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteTrack(
    @Param() trackIdParamDto: TrackIdParamDto,
  ): Promise<void> {
    return await this.tracksService.deleteTrack(trackIdParamDto.id);
  }

  @Get(':id')
  public async getTrack(
    @Param() trackIdParamDto: TrackIdParamDto,
  ): Promise<Track> {
    return await this.tracksService.getTrack(trackIdParamDto.id);
  }

  @Get()
  public async getTracks(): Promise<Track[]> {
    return await this.tracksService.getTracks();
  }

  @Put(':id')
  public async updateTrack(
    @Param() trackIdParamDto: TrackIdParamDto,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    return await this.tracksService.updateTrack(
      trackIdParamDto.id,
      updateTrackDto,
    );
  }
}
