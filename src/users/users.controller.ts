import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Injectable,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/user.create.dto';
import { UpdatePasswordDto } from './dtos/user.update.password.dto';
import { UserIdParamDto } from './dtos/user.id-param.dto';

@Injectable()
@Controller('/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserDto> {
    return this.usersService.createUser(createUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteUser(
    @Param() userIdParamDto: UserIdParamDto,
  ): Promise<void> {
    return this.usersService.deleteUser(userIdParamDto.id);
  }

  @Get(':id')
  public async getUser(
    @Param() userIdParamDto: UserIdParamDto,
  ): Promise<UserDto> {
    return this.usersService.getUser(userIdParamDto.id);
  }

  @Get()
  public async getUsers(): Promise<UserDto[]> {
    return this.usersService.getUsers();
  }

  @Put(':id')
  public async updateUserPassword(
    @Param() userIdParamDto: UserIdParamDto,
    @Body() updateUserPasswordDto: UpdatePasswordDto,
  ): Promise<UserDto> {
    return this.usersService.updateUserPassword(
      userIdParamDto.id,
      updateUserPasswordDto,
    );
  }
}
