import { Injectable } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { UserFactory } from './user.factory';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/user.create.dto';
import { UpdatePasswordDto } from './dtos/user.update.password.dto';
import { PasswordMatchValidator } from './validators/users.password-match.validator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private readonly userFactory: UserFactory,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const user = this.userFactory.create(createUserDto);

    await this.usersRepository.save(user);

    return this.mapToUserDto(user);
  }

  public async deleteUser(userId: string): Promise<void> {
    await this.usersRepository.delete(userId);
  }

  public async getUser(userId: string): Promise<UserDto> {
    const user = await this.usersRepository.findOneBy({
      id: userId,
    });

    return this.mapToUserDto(user);
  }

  public async getUsers(): Promise<UserDto[]> {
    const users = await this.usersRepository.find();

    return users.map((user) => {
      return this.mapToUserDto(user);
    });
  }

  public async updateUserPassword(
    userId: string,
    updateUserPasswordDto: UpdatePasswordDto,
  ): Promise<UserDto> {
    const user = await this.usersRepository.findOneBy({
      id: userId,
    });

    PasswordMatchValidator.isPasswordMatch(
      user,
      updateUserPasswordDto.oldPassword,
    );

    user.password = updateUserPasswordDto.newPassword;
    user.version++;

    await this.usersRepository.save(user);

    return this.mapToUserDto(user);
  }

  private mapToUserDto(user: User): UserDto {
    const userDto = new UserDto();

    userDto.id = user.id;
    userDto.login = user.login;
    userDto.version = user.version;
    userDto.createdAt = user.createdAt.getTime();
    userDto.updatedAt = user.updatedAt.getTime();

    return userDto;
  }
}
