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
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dtos/album.create.dto';
import { AlbumIdParamDto } from './dtos/album.id-param.dto';
import { Album } from './entities/album.entity';
import { UpdateAlbumDto } from './dtos/album.update.dto';

@Injectable()
@Controller('/album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public createAlbum(@Body() createAlbumDto: CreateAlbumDto): Album {
    return this.albumsService.createAlbum(createAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteAlbum(@Param() albumIdParamDto: AlbumIdParamDto): void {
    return this.albumsService.deleteAlbum(albumIdParamDto.id);
  }

  @Get(':id')
  public getAlbum(@Param() albumIdParamDto: AlbumIdParamDto): Album {
    return this.albumsService.getAlbum(albumIdParamDto.id);
  }

  @Get()
  public getAlbums(): Album[] {
    return this.albumsService.getAlbums();
  }

  @Put(':id')
  public updateAlbum(
    @Param() albumIdParamDto: AlbumIdParamDto,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Album {
    return this.albumsService.updateAlbum(albumIdParamDto.id, updateAlbumDto);
  }
}
