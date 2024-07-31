import mongoose, { Document, Schema } from 'mongoose';
import { Post as PostType} from '@shared/types/post.type';

interface IPost extends Document, Omit<PostType, 'image' | 'user' | 'comments'> {
  creatingUserId: string;
  postId: string;
  text: string;
  picture?: string;
}

const PostSchema: Schema = new Schema({
  creatingUserId: { type: String, required: true },
  postId: { type: String, required: true, unique: true },
  caption: { type: String, required: true },
  picture: { type: String },
  timestamp: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  location: { type: String },
  petName: { type: String },
  when: { type: Date },
});

export default mongoose.model<IPost>('Post', PostSchema);