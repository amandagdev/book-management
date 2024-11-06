import { useRoutes } from 'react-router-dom'
import LoginPage from '../pages/login-page/login-page'
import ProtectedRoute from './protected-route'
import RegisterPage from '../pages/register-page/register-page'
import { Suspense } from 'react'
import Spinner from '../components/ui/spinner/spinner'
import Dashboard from '../pages/dashboard/dashboard'

const AppRoutes = () =>
  useRoutes([
    { path: '/', element: <LoginPage /> },
    { path: '/register', element: <RegisterPage /> },
    {
      path: '/dashboard/*',
      element: (
        <ProtectedRoute>
          <Suspense fallback={<Spinner />}>
            <Dashboard />
          </Suspense>
        </ProtectedRoute>
      ),
    },
    { path: '*', element: <div>Not Found!</div> },
  ])

export default AppRoutes
