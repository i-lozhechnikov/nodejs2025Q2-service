import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';
import { UsersModule } from './users/users.module';
import { CustomValidationPipe } from './common/custom-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new CustomValidationPipe({ whitelist: true }));

  useContainer(app.select(UsersModule), {
    fallbackOnErrors: true,
  });

  const configService = app.get(ConfigService);

  await app.listen(configService.getOrThrow('PORT'));
}
bootstrap();
