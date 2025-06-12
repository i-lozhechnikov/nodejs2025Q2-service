import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { CommonModule } from '../common/common.module';
import { JwtAuthGuard } from './auth.jwt.guard';
import { RefreshService } from './auth.refresh.service';

@Module({
  imports: [CommonModule, UsersModule],
  providers: [AuthService, JwtAuthGuard, RefreshService],
  controllers: [AuthController],
})
export class AuthModule {}
