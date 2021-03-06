import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { addSwagger } from './startup-config/addSwagger';
import { seedTestDatawithApp } from './startup-config/seedTestDatawithApp';
import { startTestMango } from './startup-config/startTestMango';

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
