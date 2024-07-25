import { User } from './user.type'; // Import the User type from the appropriate file

export type Comment = {
  uuid: string
  content: string
  createdAt: string
  user: User
}

export type Post = {
  image: string
  caption: string
  createdAt: string
  updatedAt: string
  uuid: string
  user: User
  comments: Comment[]
  likes: number
  location: string
}

