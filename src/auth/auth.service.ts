import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignUpInput } from './dto/signup.input';
import { UserDto } from '../users/dtos/user.dto';
import { LoginInput } from './dto/login.input';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  public async login(loginInput: LoginInput): Promise<boolean> {
    const user = await this.usersService.getUserByLogin(loginInput.login);

    const isPasswordMatches = await this.comparePasswords(
      loginInput.password,
      user.password,
    );

    if (!isPasswordMatches) {
      throw new UnprocessableEntityException(`Login or password doesn't match`);
    }

    return true;
  }

  public async signUp(signupInput: SignUpInput): Promise<UserDto> {
    return await this.usersService.createUser({
      login: signupInput.login,
      password: signupInput.password,
    });
  }

  private async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
