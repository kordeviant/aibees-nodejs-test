import { NestFactory } from '@nestjs/core';
import { addSwagger } from './addSwagger';
import { AppModule } from './app.module';
import { seedTestDatawithApp } from './seedTestDatawithApp';
import { startTestMango } from './startTestMango';

async function bootstrap() {
  // start testdb
  await startTestMango();
  const app = await NestFactory.create(AppModule);
  addSwagger(app);
  await app.listen(3000);
  // seeding database
  seedTestDatawithApp(app);
}

bootstrap();
