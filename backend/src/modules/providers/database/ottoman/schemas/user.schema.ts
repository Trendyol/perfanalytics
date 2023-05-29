import { Schema } from 'ottoman';

export const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  emailVerified: { type: Boolean },
  changeMailTokenKey: { type: String },
});
