import { Injectable } from '@nestjs/common';
import {
  isUUID,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Repository } from 'typeorm';
import { Artist } from '../entities/artists.entity';
import { InjectRepository } from '@nestjs/typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsArtistExistsConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
  ) {}

  public async validate(
    value: any,
    _validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const artistId = value as string;

    if (!artistId) {
      return true;
    }

    if (!isUUID(artistId)) {
      return false;
    }

    const artist = await this.artistsRepository.findOneBy({ id: artistId });

    return !!artist;
  }

  public defaultMessage(_validationArguments: ValidationArguments): string {
    return 'Artist not found.';
  }
}
