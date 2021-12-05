import { NotFoundException } from '@nestjs/common';

export const checkEntityMapping = <T extends { id: string }>(
  entities: T[],
  ids: string[],
): void => {
  if (entities.length !== ids.length) {
    const entitiesIds = entities.map((e) => e.id);
    ids.forEach((id) => {
      if (!entitiesIds.includes(id)) {
        throw new NotFoundException(`Entity with ID '${id}' not found`);
      }
    });
  }
};
