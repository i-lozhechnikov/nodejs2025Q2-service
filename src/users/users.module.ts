import { Module } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { UserFactory } from './user.factory';
import { IsUserExistsConstraint } from './validators/user.exists.validator.constraint';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [
    UserFactory,
    UsersRepository,
    UsersService,
    IsUserExistsConstraint,
  ],
})
export class UsersModule {}
