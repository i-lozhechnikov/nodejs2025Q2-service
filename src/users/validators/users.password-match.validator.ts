import { User } from '../entities/user.entity';
import { ForbiddenException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

export class PasswordMatchValidator {
  public static async isPasswordMatch(user: User, password: string) {
    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordEqual) {
      throw new ForbiddenException('Password does not match.');
    }
  }
}
