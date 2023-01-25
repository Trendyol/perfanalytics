import { ReportEntity } from '@core/data/entities';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, now } from 'mongoose';

export type ReportDocument = Report & Document;

@Schema()
export class Report extends Document implements ReportEntity {
  @Prop()
  url: string;

  @Prop({ required: true })
  status: number;

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
    ref: 'Page',
  })
  page: string;

  @Prop({ type: Object })
  audits: Record<string, number>;

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ type: Object })
  payload?: Record<string, any>;

  @Prop()
  html?: Array<string>;
}

export const ReportSchema = SchemaFactory.createForClass(Report);
