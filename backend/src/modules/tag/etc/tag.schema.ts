import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

@Schema({
  versionKey: false,
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
})
export class Tag extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  color: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  owner: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
TagSchema.plugin(mongoosePaginate);
