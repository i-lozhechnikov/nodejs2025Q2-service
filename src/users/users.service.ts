import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserDto } from './dtos/user.dto';
import { UserFactory } from './user.factory';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/user.create.dto';
import { UpdatePasswordDto } from './dtos/user.update.password.dto';
import { PasswordMatchValidator } from './validators/users.password-match.validator';

@Injectable()
export class UsersService {
  constructor(
    private readonly userFactory: UserFactory,
    private readonly usersRepository: UsersRepository,
  ) {}

  public createUser(createUserDto: CreateUserDto): UserDto {
    const user = this.userFactory.create(createUserDto);

    this.usersRepository.create(user);

    return this.mapToUserDto(user);
  }

  public deleteUser(userId: string): void {
    this.usersRepository.delete(userId);
  }

  public getUser(userId: string): UserDto {
    const user = this.usersRepository.findById(userId);

    return this.mapToUserDto(user);
  }

  public getUsers(): User[] {
    return this.usersRepository.findAll();
  }

  public updateUserPassword(
    userId: string,
    updateUserPasswordDto: UpdatePasswordDto,
  ): UserDto {
    const user = this.usersRepository.findById(userId);

    PasswordMatchValidator.isPasswordMatch(
      user,
      updateUserPasswordDto.oldPassword,
    );

    const updatedUser = this.usersRepository.update(
      user,
      updateUserPasswordDto,
    );
    updatedUser.version++;

    return this.mapToUserDto(updatedUser);
  }

  private mapToUserDto(user: User): UserDto {
    const userDto = new UserDto();

    userDto.id = user.id;
    userDto.login = user.login;
    userDto.version = user.version;
    userDto.createdAt = user.createdAt;
    userDto.updatedAt = user.updatedAt;

    return userDto;
  }
}
