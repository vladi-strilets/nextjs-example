import { DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';

const swaggerConfig = new DocumentBuilder()
  .setTitle('API')
  .setDescription('API documentation')
  .setVersion('1.0')
  .build();

const swaggerOptions: SwaggerDocumentOptions = {};

export default { config: swaggerConfig, options: swaggerOptions };
