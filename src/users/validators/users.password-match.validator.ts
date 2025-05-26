import { User } from '../entities/user.entity';
import { BadRequestException } from '@nestjs/common';

export class PasswordMatchValidator {
  public static isPasswordMatch(user: User, password: string) {
    if (user.password !== password) {
      throw new BadRequestException('Password does not match.');
    }
  }
}
