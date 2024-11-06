import UsersTable from '../../components/tables/users-table'
import type { UserProps } from '../../types'

const Users = ({ user }: { user: UserProps }) => {
  return <UsersTable user={user} />
}

export default Users
