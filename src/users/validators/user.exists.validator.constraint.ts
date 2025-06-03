import { Injectable } from '@nestjs/common';
import {
  isUUID,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUserExistsConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async validate(
    value: any,
    _validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const userId = value as string;

    if (!isUUID(userId)) {
      return false;
    }

    const user = await this.usersRepository.findOneBy({ id: userId });

    return !!user;
  }

  public defaultMessage(_validationArguments: ValidationArguments): string {
    return 'User not found.';
  }
}
