import { Module } from '@nestjs/common';
import { LoggingService } from './common.logging.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
    }),
  ],
  providers: [LoggingService],
  exports: [JwtModule, LoggingService],
})
export class CommonModule {}
