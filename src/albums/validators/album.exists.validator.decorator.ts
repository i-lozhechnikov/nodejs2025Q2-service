import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsAlbumExistsConstraint } from './album.exists.validator.constraint';

export function IsAlbumExists(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return function (target: object, propertyName: string | symbol): void {
    registerDecorator({
      target: target.constructor,
      propertyName: propertyName.toString(),
      name: 'IsArtistExists',
      options: validationOptions,
      validator: IsAlbumExistsConstraint,
    });
  };
}
