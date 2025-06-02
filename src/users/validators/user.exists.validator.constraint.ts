import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserIdParamDto } from '../dtos/user.id-param.dto';
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
    _value: any,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const userId = validationArguments?.object as UserIdParamDto;

    const user = await this.usersRepository.findOneBy({ id: userId.id });

    return !!user;
  }

  public defaultMessage(_validationArguments: ValidationArguments): string {
    return 'User not found.';
  }
}
