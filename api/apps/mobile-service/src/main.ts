import { NestFactory } from '@nestjs/core';
import { MobileServiceModule } from './mobile-service.module';

async function bootstrap() {
  const app = await NestFactory.create(MobileServiceModule);
  await app.listen(process.env.port ?? 3002);
}
bootstrap();
