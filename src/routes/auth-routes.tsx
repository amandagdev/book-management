import { useRoutes } from 'react-router-dom'
import ProtectedRoute from './protected-route'
import Books from '../pages/books/books'
import Book from '../pages/book/book'
import type { UserProps } from '../types'
import Users from '../pages/users/users'
import AddBookForm from '../components/forms/register-book-form'

const AuthRoutes = ({ user }: { user: UserProps }) =>
  useRoutes([
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Books user={user} />
        </ProtectedRoute>
      ),
    },
    {
      path: '/users',
      element: (
        <ProtectedRoute>
          <Users user={user} />
        </ProtectedRoute>
      ),
    },
    {
      path: '/books/:bookId',
      element: (
        <ProtectedRoute>
          <Book />
        </ProtectedRoute>
      ),
    },
    {
      path: '/books/new-book',
      element: (
        <ProtectedRoute>
          <AddBookForm />
        </ProtectedRoute>
      ),
    },
    {
      path: '/books/edit-book/:bookId',
      element: (
        <ProtectedRoute>
          <AddBookForm />
        </ProtectedRoute>
      ),
    },
  ])

export default AuthRoutes
