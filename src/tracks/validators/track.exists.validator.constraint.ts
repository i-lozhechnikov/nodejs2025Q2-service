import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { TracksRepository } from '../tracks.repository';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsTrackExistsConstraint implements ValidatorConstraintInterface {
  constructor(private readonly tracksRepository: TracksRepository) {}

  public async validate(
    value: any,
    _validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const trackId = value as string;

    return !!this.tracksRepository.isTrackExists(trackId);
  }

  public defaultMessage(_validationArguments: ValidationArguments): string {
    return 'Track not found.';
  }
}
