import { TagEntity } from '@core/data/entities';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type TagDocument = Tag & Document;

@Schema()
export class Tag extends Document implements TagEntity {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  color: string;

  @Prop()
  readonly: boolean;

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

export const TagSchema = SchemaFactory.createForClass(Tag);
