import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ArtistsRepository } from '../artists.repository';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsArtistExistsConstraint implements ValidatorConstraintInterface {
  constructor(private readonly artistsRepository: ArtistsRepository) {}

  public async validate(
    value: any,
    _validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const artistId = value as string;

    if (!artistId) {
      return true;
    }

    return !!this.artistsRepository.isArtistExists(artistId);
  }

  public defaultMessage(_validationArguments: ValidationArguments): string {
    return 'Artist not found.';
  }
}
