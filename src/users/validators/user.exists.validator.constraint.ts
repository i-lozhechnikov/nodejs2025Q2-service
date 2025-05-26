import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersRepository } from '../users.repository';
import { UserIdParamDto } from '../dtos/user.id-param.dto';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUserExistsConstraint implements ValidatorConstraintInterface {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async validate(
    _value: any,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const userId = validationArguments?.object as UserIdParamDto;

    const isUserExists = this.usersRepository.isUserExists(userId.id);

    if (!isUserExists) {
      throw new NotFoundException(this.defaultMessage(validationArguments));
    }

    return true;
  }

  public defaultMessage(_validationArguments: ValidationArguments): string {
    return 'User not found.';
  }
}
