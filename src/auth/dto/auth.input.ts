import { IsNotEmpty, IsString } from 'class-validator';

export class AuthInput {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
