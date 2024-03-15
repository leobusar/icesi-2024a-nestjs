import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import e from 'express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
    );
  await app.listen(3000);
}
bootstrap();
