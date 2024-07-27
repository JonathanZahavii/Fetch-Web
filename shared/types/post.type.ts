import { User } from "./user.type"

export type Comment = {
  uuid: string
  content: string
  createdAt: string
  user: User
}

export type addComment = Omit<Comment, "uuid" | "createdAt">

export type Post = {
  image: File
  caption: string
  createdAt: string
  uuid: string
  user: User
  comments: Comment[]
  likes: number
  location: string
  petName: string
  when: Date
}

export type upsertPost = Omit<Post, "uuid" | "createdAt" | "comments" | "likes">
