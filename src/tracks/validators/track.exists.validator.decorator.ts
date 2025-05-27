import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsTrackExistsConstraint } from './track.exists.validator.constraint';

export function IsTrackExists(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return function (target: object, propertyName: string | symbol): void {
    registerDecorator({
      target: target.constructor,
      propertyName: propertyName.toString(),
      name: 'IsArtistExists',
      options: validationOptions,
      validator: IsTrackExistsConstraint,
    });
  };
}
