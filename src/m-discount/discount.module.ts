import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscountController } from './discount.controller';
import { DiscountService } from './discount.service';
import { Cat, CatSchema } from './schemas/cat.schema';
import { Product, ProductSchema } from './schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:5657/'),

    MongooseModule.forFeature([
      { name: Cat.name, schema: CatSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  controllers: [DiscountController],
  providers: [DiscountService],
})
export class DiscountModule {
  onModuleInit() {
    // console.log(this);
  }
}
