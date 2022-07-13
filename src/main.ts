import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(PORT, () => Logger.log(`Server started at port: ${PORT}`));
}
bootstrap();
