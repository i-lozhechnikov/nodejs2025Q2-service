import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from '../entities/track.entity';
import { Repository } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsTrackExistsConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Track)
    private readonly tracksRepository: Repository<Track>,
  ) {}

  public async validate(
    value: any,
    _validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const trackId = value as string;

    const track = this.tracksRepository.findOneBy({ id: trackId });

    return !!track;
  }

  public defaultMessage(_validationArguments: ValidationArguments): string {
    return 'Track not found.';
  }
}
