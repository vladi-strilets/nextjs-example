import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { validateUuid } from '../helpers/validate-uuid';

@ValidatorConstraint()
export class IsValidUuidValidator implements ValidatorConstraintInterface {
  validate(uuid: string, args: ValidationArguments) {
    return validateUuid(uuid);
  }

  defaultMessage({ property }: ValidationArguments) {
    return `${property}: wrong UUID format`;
  }
}

export function IsValidUuid(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidUuidValidator,
    });
  };
}
