export type UserProps = {
  id?: string
  name: string
  email: string
  password: string
  role?: 'admin' | 'user'
}
