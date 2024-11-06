import BooksTable from '../../components/tables/books-tables'
import type { UserProps } from '../../types'

const Books = ({ user }: { user: UserProps }) => {
  return <BooksTable user={user} />
}

export default Books
