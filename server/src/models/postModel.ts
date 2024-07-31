import mongoose, { Document, Schema } from 'mongoose';
import { Post as PostType } from '@shared/types/post.type';
import { v4 as uuidv4 } from 'uuid';

interface IPost extends Document, Omit<PostType, 'image' | 'user' | 'comments'> {
  user: string;
  uuid: string;
  caption: string;
  image: string;
}

const PostSchema: Schema = new Schema({
  image: { type: String, required: true },
  caption: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  uuid: { type: String, required: true, default: uuidv4, unique: true },
  user: { type: String, required: true },
  comments: { type: [Schema.Types.ObjectId], default: [], ref: 'Comment' },
  likes: { type: Number, default: 0 },
  location: { type: String },
  petName: { type: String },
  when: { type: Date },
});

export default mongoose.model<IPost>('Post', PostSchema);
