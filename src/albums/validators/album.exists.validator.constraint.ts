import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { AlbumsRepository } from '../albums.repository';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsAlbumExistsConstraint implements ValidatorConstraintInterface {
  constructor(private readonly albumsRepository: AlbumsRepository) {}

  public async validate(
    value: any,
    _validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const albumId = value as string;

    return !!this.albumsRepository.isAlbumExists(albumId);
  }

  public defaultMessage(_validationArguments: ValidationArguments): string {
    return 'Album not found.';
  }
}
