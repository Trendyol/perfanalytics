import { PageEntity } from '@core/data/entities';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type PageDocument = Page & Document;

@Schema()
export class Page extends Document implements PageEntity {
  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  device: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  owner: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Domain',
  })
  domain: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag',
  })
  tag: string;
}

export const PageSchema = SchemaFactory.createForClass(Page);
