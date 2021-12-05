import { ValidationPipeOptions } from '@nestjs/common';

const validationPipeOptions: ValidationPipeOptions = {
  skipMissingProperties: false,
  forbidNonWhitelisted: true,
  always: true,
  whitelist: true,
  stopAtFirstError: true,
  transform: true,
};

export default validationPipeOptions;
