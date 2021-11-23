import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { AppModule } from './app.module';
import { DiscountService } from './m-discount/discount.service';

async function bootstrap() {
  const mongod = await MongoMemoryServer.create({
    instance: { port: 5657 },
  });
  // stop mongod on exit so reset on reload
  async function exitHandler(options, exitCode) {
    if (options.cleanup) console.log('clean');
    if (exitCode || exitCode === 0) console.log(exitCode);
    if (options.exit) process.exit();
    await mongod.stop();
  }

  //do something when app is closing
  process.on('exit', exitHandler.bind(null, { cleanup: true }));

  //catches ctrl+c event
  process.on('SIGINT', exitHandler.bind(null, { exit: true }));

  // catches "kill pid" (for example: nodemon restart)
  process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
  process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));

  //catches uncaught exceptions
  process.on('uncaughtException', exitHandler.bind(null, { exit: true }));

  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('discount test')
    .setDescription('The discount API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
  // seeding database
  const disService = app.get(DiscountService);
  // create some categories
  const categories = await Promise.all([
    disService.createCat({
      name: 'cat1',
      discount: 10,
    }),
    disService.createCat({
      name: 'cat2',
      discount: 20,
    }),
    disService.createCat({
      name: 'cat3',
    }),
  ]);
  // cat3 has a parent now

  await Promise.all([
    (async () => {
      const cat2 = await disService.getCatByName('cat2');
      const cat3 = await disService.getCatByName('cat3');
      cat3.parent_cat = cat2.id;
      cat3.save();
    })(),
  ]);
  // create some products
  const products = await Promise.all([
    disService.createProduct({
      name: 'prod1',
      discount: 2,
      parent_cat: categories[0].id,
    }),
    disService.createProduct({
      name: 'prod2',
      parent_cat: categories[0].id,
    }),
    disService.createProduct({
      name: 'prod3',
      parent_cat: categories[2].id,
    }),
  ]);
}
bootstrap();
