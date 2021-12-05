import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { Paginated } from 'nestjs-paginate';
import { map, Observable } from 'rxjs';
import { serialize, SerializedResponse } from '../helpers/serialize';

@Injectable()
export class SerializeInterceptor<T, V> implements NestInterceptor {
  constructor(private dto: ClassConstructor<V>) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<SerializedResponse<T, V>> {
    return next
      .handle()
      .pipe(map((entity: T | Paginated<T>) => serialize(entity, this.dto)));
  }
}
