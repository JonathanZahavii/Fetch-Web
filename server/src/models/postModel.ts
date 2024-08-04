import { Comment, Post as PostType } from '@shared/types/post.type';
import { User } from '@shared/types/user.type';
import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

interface IPost extends Document, PostType {
  user: User;
  _id: string;
  caption: string;
  image: string;
  comments: Comment[];
}

const PostSchema: Schema = new Schema({
  image: { type: String, required: true },
  caption: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  _id: { type: String, required: true, default: uuidv4(), unique: true },
  user: { type: [Schema.Types.ObjectId], required: true, ref: 'User' },
  comments: { type: [Schema.Types.ObjectId], default: [], ref: 'Comment' },
  likes: { type: Number, default: 0 },
  location: { type: String },
  petName: { type: String },
  when: { type: Date },
});

export default mongoose.model<IPost>('Post', PostSchema);
