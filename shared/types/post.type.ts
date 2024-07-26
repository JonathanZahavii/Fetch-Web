import { User } from "./user.type" // Import the User type from the appropriate file

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

export type addPost = Omit<Post, "uuid" | "createdAt" | "comments" | "likes">