import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MSchema } from 'mongoose';

export type CatDocument = Cat & Document;

@Schema()
export class Cat {
  @Prop({ type: MSchema.Types.ObjectId, ref: 'Cat' })
  parent_cat: Cat;

  @Prop({ required: true })
  name: string;

  @Prop()
  discount: number;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
