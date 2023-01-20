import { DomainEntity } from '@core/data/entities';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type DomainDocument = Domain & Document;

@Schema()
export class Domain extends Document implements DomainEntity {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  url: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  owner: string;
}

export const DomainSchema = SchemaFactory.createForClass(Domain);
