import { NestFactory } from '@nestjs/core';
import { DriverModule } from './driver.module';

async function bootstrap() {
  const app = await NestFactory.create(DriverModule);
  await app.listen(process.env.port ?? 3001);
}
bootstrap();
