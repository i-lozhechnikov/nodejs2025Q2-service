import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Injectable,
  Post,
} from '@nestjs/common';
import { FavoritesResponse } from './dtos/favorites.response.dto';
import { FavoritesService } from './favorites.service';
import { FavoriteAlbumIdParamDto } from './dtos/favorite-album.id-param.dto';
import { FavoriteArtistIdParamDto } from './dtos/favorite-artist.id-param.dto';
import { FavoriteTrackIdParamDto } from './dtos/favorite-track.id-param.dto';
import { ParamAs } from '../common/param-as.decorator';

@Injectable()
@Controller('/favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('/album/:id')
  @HttpCode(HttpStatus.CREATED)
  public addAlbum(
    @ParamAs(FavoriteAlbumIdParamDto, 'id', 'albumId')
    favoriteAlbumIdParamDto: FavoriteAlbumIdParamDto,
  ): void {
    return this.favoritesService.addAlbum(favoriteAlbumIdParamDto.albumId);
  }

  @Post('/artist/:id')
  @HttpCode(HttpStatus.CREATED)
  public addArtist(
    @ParamAs(FavoriteArtistIdParamDto, 'id', 'artistId')
    favoriteArtistIdParamDto: FavoriteArtistIdParamDto,
  ): void {
    return this.favoritesService.addArtist(favoriteArtistIdParamDto.artistId);
  }

  @Post('/track/:id')
  @HttpCode(HttpStatus.CREATED)
  public addTrack(
    @ParamAs(FavoriteTrackIdParamDto, 'id', 'trackId')
    favoriteTrackIdParamDto: FavoriteTrackIdParamDto,
  ): void {
    return this.favoritesService.addTrack(favoriteTrackIdParamDto.trackId);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteAlbum(
    @ParamAs(FavoriteAlbumIdParamDto, 'id', 'albumId')
    favoriteAlbumIdParamDto: FavoriteAlbumIdParamDto,
  ): void {
    return this.favoritesService.deleteAlbum(favoriteAlbumIdParamDto.albumId);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteArtist(
    @ParamAs(FavoriteArtistIdParamDto, 'id', 'artistId')
    favoriteArtistIdParamDto: FavoriteArtistIdParamDto,
  ): void {
    return this.favoritesService.deleteArtist(
      favoriteArtistIdParamDto.artistId,
    );
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteTrack(
    @ParamAs(FavoriteTrackIdParamDto, 'id', 'trackId')
    favoriteTrackIdParamDto: FavoriteTrackIdParamDto,
  ): void {
    return this.favoritesService.deleteTrack(favoriteTrackIdParamDto.trackId);
  }

  @Get()
  public getFavorites(): FavoritesResponse {
    return this.favoritesService.getFavorites();
  }
}
