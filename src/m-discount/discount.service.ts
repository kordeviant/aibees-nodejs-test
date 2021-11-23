import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCatDto } from './dtos/create.cat.dto';
import { CreateProdDto } from './dtos/create.prod.dto';
import { Cat, CatDocument } from './schemas/cat.schema';
import { Product, ProductDocument } from './schemas/product.schema';

const retDiscount = (model: Model<any>) => {
  return (x) => {
    if (!x.discount && !x.parent_cat) {
      return -1;
    } else if (x.discount) {
      return x.discount;
    } else if (x.parent_cat) {
      return model
        .findById(x.parent_cat)
        .then(retDiscount(model))
        .catch((err) => -1);
    } else {
      return -1;
    }
  };
};

@Injectable()
export class DiscountService {
  constructor(
    @InjectModel(Cat.name) private catModel: Model<CatDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async getDiscountProduct(prodId) {
    return this.productModel
      .findById(prodId)
      .then(retDiscount(this.catModel))
      .catch((e) => -1);
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
