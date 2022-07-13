import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { Device } from '../enums';

@Schema({
  versionKey: false,
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
})
export class Page extends Document {
  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  device: Device;

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
}

export const PageSchema = SchemaFactory.createForClass(Page);
PageSchema.plugin(mongoosePaginate);
