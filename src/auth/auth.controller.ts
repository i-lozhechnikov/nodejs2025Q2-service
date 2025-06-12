import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Injectable,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpInput } from './dto/auth.signup.input';
import { UserDto } from '../users/dtos/user.dto';
import { LoginInput } from './dto/auth.login.input';
import { JwtToken } from './dto/auth.jwt-token';
import { Public } from './decorators/auth.public.decorator';

@Injectable()
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  public signUp(@Body() signUpInput: SignUpInput): Promise<UserDto> {
    return this.authService.signUp(signUpInput);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.CREATED)
  public login(@Body() loginInput: LoginInput): Promise<JwtToken> {
    return this.authService.login(loginInput);
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.CREATED)
  public refresh(): void {}
}
