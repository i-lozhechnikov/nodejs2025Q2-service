import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/user.create.dto';

@Injectable()
export class UserFactory {
  public create(createUserDto: CreateUserDto) {
    const user = new User();

    user.login = createUserDto.login;

    return user;
  }
}
