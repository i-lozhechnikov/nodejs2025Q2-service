import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CustomValidationPipe } from './custom-validation.pipe';

export function ParamAs<T>(
  dtoClass: new () => T,
  sourceParam: string,
  targetField: keyof T,
) {
  return createParamDecorator(async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const rawId = request.params[sourceParam];

    const input = {
      [targetField]: rawId,
    };

    const pipe = new CustomValidationPipe({
      whitelist: true,
    });

    try {
      const validatedDto = await pipe.transform(input, {
        type: 'param',
        metatype: dtoClass,
      });

      return validatedDto;
    } catch (e) {
      throw e;
    }
  })();
}
