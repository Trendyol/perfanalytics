import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Status, Device } from '../enums';

@Schema({
  versionKey: false,
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
})
export class Lighthouse extends Document {
  @Prop()
  url: string;

  @Prop({ required: true })
  status: Status;

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

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Page',
  })
  page: string;

  @Prop({ type: Object })
  audits: Record<string, number>;
}

export const LighthouseSchema = SchemaFactory.createForClass(Lighthouse);
