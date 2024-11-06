// src/hooks/useFetch.ts
import { useQuery } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'
import type { UserProps } from '../types'
export const fetchUsers = async (): Promise<
  AxiosResponse<UserProps[], UserProps[]>
> => {
  try {
    const response = await axios.get('http://localhost:3000/users')
    return response
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const UsersFetch = () => {
  const query = useQuery({ queryKey: ['users'], queryFn: fetchUsers })

  return query
}

export default UsersFetch
