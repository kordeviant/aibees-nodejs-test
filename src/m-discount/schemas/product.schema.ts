import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MSchema } from 'mongoose';
import { Cat } from './cat.schema';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ type: MSchema.Types.ObjectId, ref: 'Cat' })
  parent_cat: Cat;

  @Prop({ required: true })
  name: string;

  @Prop()
  discount: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
