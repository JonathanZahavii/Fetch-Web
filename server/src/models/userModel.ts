import { User } from '@shared/types/user.type';
import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

interface IUser extends Document, User {
  _id: string;
  password: string;
}

const userSchema: Schema = new Schema<IUser>({
  _id: { type: String, default: uuidv4, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  photoURL: { type: String },
  password: { type: String, required: true },
});

export default mongoose.model<IUser>('User', userSchema);
