import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignUpInput } from './dto/auth.signup.input';
import { UserDto } from '../users/dtos/user.dto';
import { LoginInput } from './dto/auth.login.input';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import * as process from 'node:process';
import { JwtToken } from './dto/auth.jwt-token';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  public async login(loginInput: LoginInput): Promise<JwtToken> {
    const user = await this.usersService.getUserByLogin(loginInput.login);

    const isPasswordMatches = await this.comparePasswords(
      loginInput.password,
      user.password,
    );

    if (!isPasswordMatches) {
      throw new UnprocessableEntityException(`Login or password doesn't match`);
    }

    return await this.generateTokens(user.id, user.login);
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

  async generateTokens(userId: string, login: string): Promise<JwtToken> {
    const payload = { userId, login };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });

    return new JwtToken(accessToken, refreshToken);
  }
}
