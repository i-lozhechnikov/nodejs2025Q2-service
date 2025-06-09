import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserFactory } from './user.factory';
import { IsUserExistsConstraint } from './validators/user.exists.validator.constraint';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UserFactory, UsersService, IsUserExistsConstraint],
  exports: [TypeOrmModule],
})
export class UsersModule {}
