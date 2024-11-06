import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Button from '../button'

describe('<Button/>', () => {
  it('Should render Button with the current child', () => {
    render(<Button>Entrar</Button>)

    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument()
  })

  it('Button should be disabled when disalbed is true', () => {
    render(<Button disabled>Entrar</Button>)

    expect(screen.getByRole('button', { name: /entrar/i })).toBeDisabled()
  })
})
