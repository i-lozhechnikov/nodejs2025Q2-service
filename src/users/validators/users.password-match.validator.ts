import { User } from '../entities/user.entity';
import { ForbiddenException } from '@nestjs/common';

export class PasswordMatchValidator {
  public static isPasswordMatch(user: User, password: string) {
    if (user.password !== password) {
      throw new ForbiddenException('Password does not match.');
    }
  }
}
