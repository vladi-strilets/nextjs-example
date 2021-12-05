import {
  BadRequestException,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { MainEntity } from 'src/api/shared/entities/main.entity';
import { checkValidUuid } from 'src/api/shared/helpers/validate-uuid';
import { EntityTarget, getRepository } from 'typeorm';
import { checkEntityMapping } from '../helpers/check-entity-mapping';

@Injectable()
export class EntityValidationPipe<T extends MainEntity>
  implements PipeTransform
{
  constructor(private entityClass: EntityTarget<T>) {}

  async transform(value: string | string[]) {
    const repository = getRepository(this.entityClass);

    if (Array.isArray(value)) {
      if (value.length === 0) {
        throw new BadRequestException(`Array should not be empty`);
      }

      checkValidUuid(value);

      const entities = await repository.findByIds(value);
      checkEntityMapping(entities, value);

      return entities;
    }

    checkValidUuid(value);

    const entity = await repository.findOne(value);
    if (!entity) {
      throw new NotFoundException(`Entity '${value}'' doesn't exist`);
    }

    return entity;
  }
}
