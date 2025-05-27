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
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dtos/artist.create.dto';
import { Artist } from './entities/artists.entity';
import { ArtistIdParamDto } from './dtos/artist.id-param.dto';
import { UpdateArtistDto } from './dtos/artist.update.dto';

@Injectable()
@Controller('/artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public createArtist(@Body() createArtistDto: CreateArtistDto): Artist {
    return this.artistsService.createArtist(createArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteArtist(@Param() artistIdParamDto: ArtistIdParamDto): void {
    return this.artistsService.deleteArtist(artistIdParamDto.id);
  }

  @Get(':id')
  public getArtist(@Param() artistIdParamDto: ArtistIdParamDto): Artist {
    return this.artistsService.getArtist(artistIdParamDto.id);
  }

  @Get()
  public getArtists(): Artist[] {
    return this.artistsService.getArtists();
  }

  @Put(':id')
  public updateArtist(
    @Param() artistIdParamDto: ArtistIdParamDto,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Artist {
    return this.artistsService.updateArtist(
      artistIdParamDto.id,
      updateArtistDto,
    );
  }
}
