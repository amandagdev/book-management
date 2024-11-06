import axios from 'axios'
import { UserProps } from '../types'

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.get('http://localhost:3000/users')
    const users = (await response.data) as UserProps[]
    const currentUser = users.find((user) => user.email === email)

    if (!currentUser || !password || !email)
      return {
        success: false,
        data: null,
        message: 'email or password invalid',
      }

    if (currentUser.password !== password)
      return {
        success: false,
        data: null,
        message: 'email or password invalid',
      }

    return {
      success: true,
      data: currentUser,
      message: 'Log in successfully',
    }
  } catch (error: any) {
    return {
      success: false,
      data: null,
      message: error.message,
    }
  }
}

export const registerUser = async (user: UserProps) => {
  const { email, name, password } = user
  try {
    if (!email || !name || !password) {
      return {
        success: false,
        data: null,
        message: 'All inputs needs to be valid',
      }
    }
    const { data } = await axios.post('http://localhost:3000/users', {
      ...user,
      role: 'user',
    })
    return {
      success: true,
      data,
      message: 'User created successfully',
    }
  } catch (error: any) {
    return {
      success: false,
      data: null,
      message: error.message,
    }
  }
}
