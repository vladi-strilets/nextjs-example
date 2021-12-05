import { BadRequestException } from '@nestjs/common';

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const validateUuid = (uuid: string): boolean => {
  return UUID_REGEX.test(uuid);
};

export const checkValidUuid = (value: string | string[]): void => {
  const message = `Wrong uuid format for source ':v'`;

  if (Array.isArray(value)) {
    value.forEach((v) => {
      if (!validateUuid(v)) {
        throw new BadRequestException(message.replace(':v', v));
      }
    });
    return;
  }

  if (!validateUuid(value)) {
    throw new BadRequestException(message.replace(':v', value));
  }
};
