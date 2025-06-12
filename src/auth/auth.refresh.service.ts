import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { RefreshTokenInput } from './dto/auth.refresh-token.input';
import { JwtToken } from './dto/auth.jwt-token';

@Injectable()
export class RefreshService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}
  public async refresh(
    refreshTokenInput?: RefreshTokenInput,
  ): Promise<JwtToken> {
    if (!refreshTokenInput.refreshToken) {
      throw new UnauthorizedException('Refresh token is not provided.');
    }

    let payload: { userId: string; logins: string };
    try {
      payload = await this.jwtService.verifyAsync(
        refreshTokenInput.refreshToken,
        {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
        },
      );
    } catch {
      throw new ForbiddenException('Refresh token is invalid');
    }

    const user = await this.usersService.getUser(payload.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.authService.generateTokens(user.id, user.login);
  }
}
