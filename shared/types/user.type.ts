export type User = {
  uuid: string
  name: string
  email: string
  photoURL?: string
}

export type NewUser = {
  name: string
  email: string
  password: string
}