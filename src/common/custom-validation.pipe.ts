import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ValidationPipe,
  ValidationError,
  ValidationPipeOptions,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoriteIdParamAbstract } from '../favorites/dtos/favorite.id-param.abstract.dto';
import { LoginInput } from '../auth/dto/auth.login.input';

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
  constructor(options?: ValidationPipeOptions) {
    super({
      ...options,
      exceptionFactory: (errors: ValidationError[]) => {
        const badRequestMessages = [];
        const notFoundMessages = [];
        const unprocessableEntityMessages = [];
        for (const error of errors) {
          const messages = Object.values(error.constraints);
          for (const message of messages) {
            if (message.includes('not found')) {
              if (error.property === 'id') {
                notFoundMessages.push(message);
              } else if (
                error.target instanceof FavoriteIdParamAbstract ||
                error.target instanceof LoginInput
              ) {
                unprocessableEntityMessages.push(message);
              }

              continue;
            }

            badRequestMessages.push(message);
          }
        }

        if (badRequestMessages.length === 0) {
          if (notFoundMessages.length > 0) {
            return new NotFoundException(notFoundMessages);
          }

          if (unprocessableEntityMessages.length > 0) {
            return new UnprocessableEntityException(
              unprocessableEntityMessages,
            );
          }
        }

        return new BadRequestException(badRequestMessages);
      },
    });
  }
}
