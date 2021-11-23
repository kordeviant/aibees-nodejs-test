import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { DiscountService } from './discount.service';
import { Cat } from './schemas/cat.schema';
import { Product } from './schemas/product.schema';

@Controller('discount')
export class DiscountController {
  constructor(private discountService: DiscountService) {}

  @Get('discount/:id')
  @Roles(Role.Admin)
  @ApiParam({
    name: 'id',
    required: true,
    description: 'string for the product id',
    schema: { type: 'string' },
  })
  async getDiscount(@Param('id') id: string): Promise<number> {
    // return 2;
    return this.discountService.getDiscountProduct(id);
  }

  @Get('categories')
  async categories(): Promise<Cat[]> {
    return this.discountService.getCats();
  }

  @Get('products')
  async products(): Promise<Product[]> {
    return this.discountService.getProducts();
  }
}
