import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ValidationPipe,
  ValidationError,
  ValidationPipeOptions,
} from '@nestjs/common';

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
  constructor(options?: ValidationPipeOptions) {
    super({
      ...options,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = CustomValidationPipe.flattenValidationErrors(errors);

        const badRequestMessages = [];
        const notFoundMessages = [];
        for (const message of messages) {
          if (message.includes('not found.')) {
            notFoundMessages.push(message);
            continue;
          }

          badRequestMessages.push(message);
        }

        if (badRequestMessages.length === 0 && notFoundMessages.length > 0) {
          return new NotFoundException(notFoundMessages);
        }

        return new BadRequestException(badRequestMessages);
      },
    });
  }

  private static flattenValidationErrors(
    validationErrors: ValidationError[],
  ): string[] {
    const result: string[] = [];
    for (const error of validationErrors) {
      if (error.constraints) {
        result.push(...Object.values(error.constraints));
      }
      if (error.children?.length) {
        result.push(...this.flattenValidationErrors(error.children));
      }
    }
    return result;
  }
}
