import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Rest Social API')
    .setDescription('API REST Social construida con NestJS, Drizzle ORM y PostgreSQL')
    .setVersion('1.0')
    .addTag('users', 'Operaciones relativas a la gestión de usuarios')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  app.use(
    '/docs',
    apiReference({
      content: document,
    }),
  );
}
