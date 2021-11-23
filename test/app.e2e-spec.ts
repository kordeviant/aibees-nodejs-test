import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { DiscountService } from './../src/m-discount/discount.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let products;
  let mongod;

  beforeEach(async () => {
    mongod = await MongoMemoryServer.create({
      instance: { port: 5657 },
    });
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();

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
    products = await Promise.all([
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
  });

  it(`/ (GET)`, () => {
    return request(app.getHttpServer())
      .get('/discount/discount/' + products[2].id)
      .expect(200)
      .expect('20');
  });

  afterAll(async () => {
    await app.close();
    await mongod.stop();
  });
});
