import { useEffect, useState } from 'react'
import Button from '../ui/button/button'
import { loginUser } from '../../services/auth-service'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
})

const LoginForm = () => {
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setTimeout(() => {
      setError('')
    }, 4000)

    return () => clearTimeout(interval)
  }, [error])

  const loginMutation = useMutation({
    mutationFn: (values: any) => loginUser(values.email, values.password),
    onSuccess: (data) => {
      if (!data.success) {
        setError(data.message)
        return
      }

      console.log('Successfully logged in:', data)
      localStorage.setItem('user', JSON.stringify(data.data))
      navigate('/dashboard')
    },
    onError: (error) => {
      console.error('Login error:', error)
    },
  })

  const handleOnSubmit = (values: any) => {
    loginMutation.mutate(values)
  }

  return (
    <div>
      {error && (
        <span className="text-red-600 font-bold flex justify-center">
          {error}
        </span>
      )}
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleOnSubmit}
      >
        {({ handleChange, values }) => (
          <Form>
            <div className="mb-8 flex flex-col text-black">
              <label htmlFor="email">Email</label>
              <Field
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                className="input-field p-2"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-600"
              />

              <label htmlFor="password">Password</label>
              <Field
                id="password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                className="input-field p-2"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-600"
              />
            </div>
            <div>
              <Button fullWidth type="submit">
                Login
              </Button>
              <p className="text-end text-sm mt-1">
                Do not have an account yet?{' '}
                <a href="/register" className="text-primary">
                  Register
                </a>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default LoginForm
