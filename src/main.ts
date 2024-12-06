import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT = 3000; // You can replace this with a dynamic port if needed.
  await app.listen(PORT);

  const url = await app.getUrl();
  console.log(`Application is running on: ${url}`, 'Bootstrap');
}
bootstrap();
