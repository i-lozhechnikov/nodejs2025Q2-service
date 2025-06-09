import { Injectable } from '@nestjs/common';
import {
  isUUID,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from '../entities/album.entity';
import { Repository } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsAlbumExistsConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Album)
    private readonly albumsRepository: Repository<Album>,
  ) {}

  public async validate(
    value: any,
    _validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const albumId = value as string;

    if (!albumId) {
      return true;
    }

    if (!isUUID(albumId)) {
      return false;
    }

    const album = await this.albumsRepository.findOneBy({ id: albumId });

    return !!album;
  }

  public defaultMessage(_validationArguments: ValidationArguments): string {
    return 'Album not found.';
  }
}
