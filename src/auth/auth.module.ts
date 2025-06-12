import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { CommonModule } from '../common/common.module';
import { JwtAuthGuard } from './auth.jwt.guard';

@Module({
  imports: [CommonModule, UsersModule],
  providers: [AuthService, JwtAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
