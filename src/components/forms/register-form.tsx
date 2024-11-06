import Input from '../ui/input/input'
import Button from '../ui/button/button'
import { useMutation } from '@tanstack/react-query'
import { registerUser } from '../../services/auth-service'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import type { UserProps } from '../../types'

const RegisterForm = () => {
  const navigate = useNavigate()

  const registerMutation = useMutation({
    mutationFn: (user: UserProps) => registerUser(user),
    onSuccess: (data) => {
      if (!data.success) {
        return
      }
      localStorage.setItem('user', JSON.stringify(data.data))
      navigate('/dashboard')
    },
    onError: (e) => {
      console.log(e)
    },
  })

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Name must be at least 3 characters long')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .required('Password is required'),
  })

  return (
    <div className="max-w-md mx-auto p-4  shadow-md rounded">
      <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          registerMutation.mutate(values)
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium ">
                Name
              </label>
              <Field
                as={Input}
                id="name"
                name="name"
                type="text"
                className="mt-1 block w-full"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium ">
                Email
              </label>
              <Field
                as={Input}
                id="email"
                name="email"
                type="email"
                className="mt-1 block w-full"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium ">
                Password
              </label>
              <Field
                as={Input}
                id="password"
                name="password"
                type="password"
                className="mt-1 block w-full"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <Button fullWidth type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Registrando...' : 'Registrar'}
            </Button>
            <p className="text-end text-sm mt-1">
              Already have an account?{' '}
              <a href="/" className="text-primary">
                Login
              </a>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default RegisterForm
