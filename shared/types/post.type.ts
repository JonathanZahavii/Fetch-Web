import { User } from "./user.type"

export type Comment = {
  uuid: string
  content: string
  createdAt: string
  user: User
}

export type addComment = Omit<Comment, "uuid" | "createdAt">

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
  "_id" | "createdAt" | "comments" | "likes" | "image"
> & { image: File }
