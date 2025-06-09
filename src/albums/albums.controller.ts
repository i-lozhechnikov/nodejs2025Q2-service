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
  public async createAlbum(
    @Body() createAlbumDto: CreateAlbumDto,
  ): Promise<Album> {
    return await this.albumsService.createAlbum(createAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteAlbum(
    @Param() albumIdParamDto: AlbumIdParamDto,
  ): Promise<void> {
    return await this.albumsService.deleteAlbum(albumIdParamDto.id);
  }

  @Get(':id')
  public async getAlbum(
    @Param() albumIdParamDto: AlbumIdParamDto,
  ): Promise<Album> {
    return await this.albumsService.getAlbum(albumIdParamDto.id);
  }

  @Get()
  public async getAlbums(): Promise<Album[]> {
    return await this.albumsService.getAlbums();
  }

  @Put(':id')
  public async updateAlbum(
    @Param() albumIdParamDto: AlbumIdParamDto,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    return await this.albumsService.updateAlbum(
      albumIdParamDto.id,
      updateAlbumDto,
    );
  }
}
