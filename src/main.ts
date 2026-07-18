import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  // CORS
  app.enableCors();

  app.enableShutdownHooks();

  await app.listen(process.env.PORT ?? 3000);

  console.log(
    `🚀 FitForge API running on http://localhost:${process.env.PORT ?? 3000}/api/v1`,
  );
}

void bootstrap();
