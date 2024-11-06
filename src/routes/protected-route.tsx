import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import type { UserProps } from '../types'

type ProtectedRouteProps = {
  children: ReactNode
  role?: 'admin' | 'user' | 'creator'
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = JSON.parse(localStorage.getItem('user') as string) as UserProps
  const isLogged = !!user
  console.log(isLogged)
  if (!isLogged) {
    return <Navigate to="/" />
  }

  return children
}

export default ProtectedRoute
