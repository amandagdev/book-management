import axios from 'axios'
import type { BooksProps } from '../components/tables/types'

export const deleteBook = async (bookId: string) => {
  try {
    await axios.delete(`http://localhost:3000/books/${bookId}`)
    console.log(`Book with ID ${bookId} deleted successfully.`)
  } catch (error) {
    console.error(`Error deleting book with ID ${bookId}:`, error)
  }
}

export const fetchBooks = async () => {
  const response = await axios.get('http://localhost:3000/books/')
  const books = await response.data
  return books
}

export const fetchBookById = async (bookId: string) => {
  const response = await axios.get(`http://localhost:3000/books/${bookId}`)
  const book = await response.data
  return book
}

export const createBook = async (newBook: BooksProps) => {
  const response = await axios.post('http://localhost:3000/books', newBook)
  return response.data
}

export const editBook = async (id: string, newBook: BooksProps) => {
  const response = await axios.put(`http://localhost:3000/books/${id}`, newBook)
  return response.data
}
