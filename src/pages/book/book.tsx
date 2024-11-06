import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchBookById } from '../../services/books-service'
import Button from '../../components/ui/button/button'
import { queryClient } from '../../utils/query-client'

const Book = () => {
  const { bookId } = useParams()
  const { data } = useQuery({
    queryKey: ['book', bookId],
    queryFn: () => fetchBookById(bookId as string),
  })
  const navigate = useNavigate()

  return (
    data && (
      <div className="relative bg-secondary size-72 p-4 flex flex-col items-center justify-center gap-4">
        <div className="absolute left-5 top-5">
          <Button
            onClick={() => {
              queryClient.invalidateQueries({ queryKey: ['book'] })
              navigate(-1)
            }}
          >
            {'<-'}
          </Button>
        </div>
        <h2 className="text-white">Book: {data.name}</h2>
        <span>Author: {data.author}</span>
        <span>Pages: {data.pages}</span>
        <span>id: {data.id}</span>
      </div>
    )
  )
}

export default Book
