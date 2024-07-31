import mongoose, { Document, Schema } from 'mongoose';
import { Post as PostType, upsertPost } from '@shared/types/post.type';

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
  uuid: { type: String, required: true, unique: true },
  user: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  likes: { type: Number, default: 0 },
  location: { type: String },
  petName: { type: String },
  when: { type: Date },
});

export default mongoose.model<IPost>('Post', PostSchema);
