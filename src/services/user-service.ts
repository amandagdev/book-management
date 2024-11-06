import axios from 'axios'
import type { UserProps } from '../types'

export const loadUsers = async () => {
  try {
    const response = await axios.get('http://localhost:3000/users')
    return response.data
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const changeRole = async (
  id: string,
  currentUser: UserProps,
  role: string,
) => {
  try {
    const data = { ...currentUser, role }
    const response = await axios.put(`http://localhost:3000/users/${id}`, {
      ...data,
    })
    return response.data
  } catch (error: any) {
    throw new Error(error.message)
  }
}
