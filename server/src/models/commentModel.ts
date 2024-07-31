import mongoose, { Document, Schema } from 'mongoose';
import { Comment as CommentType, addComment } from '@shared/types/post.type';

interface IComment extends Document, Omit<CommentType, 'uuid' | 'createdAt' | 'user'> {
  linkedPostId: string;
  creatingUserId: string;
  text: string;
}

const CommentSchema: Schema = new Schema({
  linkedPostId: { type: String, required: true },
  creatingUserId: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IComment>('Comment', CommentSchema);
