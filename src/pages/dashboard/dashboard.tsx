import type { UserProps } from '../../types'
import { FaBook, FaUser } from 'react-icons/fa'
import { FaSquarePlus } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import AuthRoutes from '../../routes/auth-routes'

const Dashboard = () => {
  const navigate = useNavigate()
  const user = JSON.parse(
    localStorage.getItem('user') as string,
  ) as unknown as UserProps

  const menuRole = {
    admin: [
      { icon: <FaBook />, label: 'Books', path: '' },
      { icon: <FaSquarePlus />, label: 'New Book', path: 'books/new-book' },
      { icon: <FaUser />, label: 'Users', path: 'users' },
    ],
    user: [{ icon: <FaBook />, label: 'Books', path: '' }],
  }

  return (
    <div className="flex h-full">
      <div className="w-32 flex flex-col gap-3 py-3 items-center bg-secondary">
        <div className="mb-20">User: {user.name}</div>
        <ul className="flex flex-col items-center gap-10">
          {menuRole[user.role!]?.map((item) => (
            <li
              key={item.label}
              className="flex items-center justify-center w-max cursor-pointer"
              onClick={() => navigate(`/dashboard/${item.path}`)}
            >
              <div className="bg-primary p-3 rounded-full relative group">
                <span className="absolute -top-6 transform  mt-2 opacity-0 transition-opacity duration-300 text-gray-800 bg-white px-2 py-1 rounded shadow-lg group-hover:opacity-80">
                  {item.label}
                </span>
                {item.icon}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 h-full flex items-center justify-center">
        <AuthRoutes user={user} />
      </div>
    </div>
  )
}

export default Dashboard
