import { ClassConstructor, plainToClass } from 'class-transformer';
import { Paginated } from 'nestjs-paginate';

export type SerializedResponse<T, V> =
  | V
  | (Omit<Paginated<V>, 'meta'> & {
      meta: Paginated<T>['meta'];
    });

export const serialize = <T, V>(
  object: T | Paginated<T>,
  dto: ClassConstructor<V>,
): SerializedResponse<T, V> => {
  if (object instanceof Paginated) {
    return { ...object, data: plainToClass(dto, object.data) };
  }
  return plainToClass(dto, object);
};
