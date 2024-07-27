export type User = {
  uuid: string
  name: string
  email: string
  photoURL?: string
}

export type SignUpRequest = {
  name: string
  email: string
  password: string
}

export type LoginRequest = { email: string; password: string }

export type LoginResponse = {
  user: User
  token: string
  refreshToken: string
}
