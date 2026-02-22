import mongoose, { Schema, Document, Model } from 'mongoose';

export interface UserDocument extends Document {
  uuid: string;
  name: string;
  email: string;
  photo_url: string;
  partner_id: string;
  partner_token: string;
  created_at?: Date;
  updated_at?: Date;
}

const UserSchema: Schema<UserDocument> = new Schema<UserDocument>({
  uuid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  photo_url: { type: String, required: true },
  partner_id: { type: String, required: true },
  partner_token: { type: String, required: true },
  created_at: { type: Date, required: false },
  updated_at: { type: Date, required: true },
}, { strict: false });

export const UserModel: Model<UserDocument> = mongoose.model<UserDocument>('User', UserSchema);
