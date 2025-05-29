import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UpdatePasswordDto } from './dtos/user.update.password.dto';

@Injectable()
export class UsersRepository {
  public users: User[];

  constructor() {
    this.users = [];
  }

  public create(user: User): void {
    this.users.push(user);
  }

  public delete(userId: string): void {
    const userToDeleteIndex = this.users.findIndex(
      (user) => user.id === userId,
    );

    this.users.splice(userToDeleteIndex, 1);
  }

  public findAll(): User[] {
    return this.users;
  }

  public findById(userId: string): User | null {
    return this.users.find((user) => user.id === userId);
  }

  public isUserExists(userId: string): boolean {
    const user = this.users.find((user) => user.id === userId);

    return !!user;
  }

  public update(user: User, updatePasswordDto: UpdatePasswordDto): User {
    user.password = updatePasswordDto.newPassword;

    return user;
  }
}
