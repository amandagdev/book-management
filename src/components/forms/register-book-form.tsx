import { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Button from '../ui/button/button'
import Input from '../ui/input/input'
import { useNavigate, useParams } from 'react-router-dom'
import {
  createBook,
  editBook,
  fetchBookById,
} from '../../services/books-service'
import type { BooksProps } from '../tables/types'

const AddBookForm = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { bookId } = useParams()

  const [name, setName] = useState('')
  const [author, setAuthor] = useState('')
  const [pages, setPages] = useState('')
  const [currentBook, setCurrentBook] = useState<BooksProps>()

  const loadBookById = async (bookId: string) => {
    const data = await fetchBookById(bookId)
    setCurrentBook(data)
  }

  useEffect(() => {
    if (bookId) {
      loadBookById(bookId)
    }
  }, [bookId])

  useEffect(() => {
    if (currentBook) {
      setName(currentBook.name)
      setAuthor(currentBook.author)
      setPages(currentBook.pages)
    }
  }, [bookId, currentBook])

  const newBook = { name, author, pages }
  const createMutation = useMutation({
    mutationFn: () => createBook(newBook),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] })
      setName('')
      setAuthor('')
      setPages('')
    },
    onError: (error) => {
      console.error('Erro ao criar o livro', error)
    },
  })

  const editMutation = useMutation({
    mutationFn: () => editBook(bookId!, { name, author, pages }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] })
      setName('')
      setAuthor('')
      setPages('')
    },
    onError: (error) => {
      console.error('Erro ao criar o livro', error)
    },
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (!bookId) {
      if (!name || !author || !pages) {
        alert('Por favor, preencha todos os campos.')
        return
      }
      createMutation.mutate()
    }
    if (bookId) {
      if (!name || !author || !pages) {
        alert('Por favor, preencha todos os campos.')
        return
      }
      editMutation.mutate()
      navigate(-1)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md w-96">
      <h2 className="text-2xl font-semibold text-primary mb-6 text-center">
        {bookId ? 'Edit Book' : 'Add New Book'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-primary font-medium">
            Book Name
          </label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="author" className="block text-primary font-medium">
            Author
          </label>
          <Input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="pages" className="block text-primary font-medium">
            Number Pages
          </label>
          <Input
            type="number"
            id="pages"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            required
          />
        </div>
        <Button type="submit" fullWidth>
          {bookId ? 'Edit Book' : 'Add Book'}
        </Button>
      </form>
      {createMutation.isError && (
        <p className="text-red-500 mt-4">Error. Try again!</p>
      )}
      {createMutation.isSuccess && (
        <p className="text-green-500 mt-4">Book add successfully!</p>
      )}
    </div>
  )
}

export default AddBookForm
