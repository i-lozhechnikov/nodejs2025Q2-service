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
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = CustomValidationPipe.flattenValidationErrors(errors);

        const badRequestMessages = [];
        for (const message of messages) {
          if (message.includes('not found.')) {
            if (messages.length === 1) {
              return new NotFoundException(message);
            }

            continue;
          }

          badRequestMessages.push(message);
        }

        console.log(badRequestMessages);

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
