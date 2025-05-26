import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsUserExistsConstraint } from './user.exists.validator.constraint';

export function IsUserExists(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return function (target: object, propertyName: string | symbol): void {
    registerDecorator({
      target: target.constructor,
      propertyName: propertyName.toString(),
      name: 'IsUserExists',
      options: validationOptions,
      validator: IsUserExistsConstraint,
    });
  };
}
