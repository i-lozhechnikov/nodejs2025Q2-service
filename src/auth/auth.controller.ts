import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Injectable,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpInput } from './dto/signup.input';
import { UserDto } from '../users/dtos/user.dto';
import { LoginInput } from './dto/login.input';

@Injectable()
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  public signUp(@Body() signUpInput: SignUpInput): Promise<UserDto> {
    return this.authService.signUp(signUpInput);
  }

  @Post('login')
  @HttpCode(HttpStatus.CREATED)
  public login(@Body() loginInput: LoginInput): Promise<boolean> {
    return this.authService.login(loginInput);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.CREATED)
  public refresh(): void {}
}
