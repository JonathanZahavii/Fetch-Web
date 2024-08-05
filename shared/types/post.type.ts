import { User } from "./user.type"

export type Comment = {
  content: string
  createdAt: Date
  userId: string
  userName: string
}

export type addComment = Omit<Comment, "createdAt">

export type Post = {
  image: string
  caption: string
  createdAt: Date
  _id: string
  user: User
  comments: Comment[]
  likes: string[]
  location: string
  petName: string
  when: Date
}

export type upsertPost = Omit<
  Post,
  "createdAt" | "comments" | "likes" | "image" | "user"
> & { image: File, user: string, _id: string }
