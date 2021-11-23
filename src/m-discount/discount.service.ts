import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCatDto } from './dtos/create.cat.dto';
import { CreateProdDto } from './dtos/create.prod.dto';
import { Cat, CatDocument } from './schemas/cat.schema';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class DiscountService {
  constructor(
    @InjectModel(Cat.name) private catModel: Model<CatDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async getDiscountProduct(prodId) {
    const dis = await this.productModel.findById(prodId).exec();
    if (dis.discount) {
      return dis.discount;
    } else {
      return this.getDiscountCategory(dis.parent_cat);
    }
  }
  async getDiscountCategory(catId) {
    const dis = await this.catModel.findById(catId).exec();
    if (dis.discount) {
      return dis.discount;
    } else {
      return this.getDiscountCategory(dis.parent_cat);
    }
  }
  async createProduct(input: CreateProdDto): Promise<ProductDocument> {
    const created = new this.productModel(input);
    return created.save();
  }
  async getProducts(): Promise<ProductDocument[]> {
    return this.productModel.find().exec();
  }

  async createCat(input: CreateCatDto): Promise<CatDocument> {
    const created = new this.catModel(input);
    return created.save();
  }
  async getCatByName(name): Promise<CatDocument> {
    return this.catModel.findOne({ name }).exec();
  }
  async getCats(): Promise<CatDocument[]> {
    return this.catModel.find().exec();
  }
}
