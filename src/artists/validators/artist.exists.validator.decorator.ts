import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsArtistExistsConstraint } from './artist.exists.validator.constraint';

export function IsArtistExists(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return function (target: object, propertyName: string | symbol): void {
    registerDecorator({
      target: target.constructor,
      propertyName: propertyName.toString(),
      name: 'IsArtistExists',
      options: validationOptions,
      validator: IsArtistExistsConstraint,
    });
  };
}
