import React, { ReactNode } from 'react'
import clsx from 'clsx'

type ButtonProps = {
  children: ReactNode
  icon?: string
  fullWidth?: boolean
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  type?: 'submit' | 'button'
  model?: 'destroy' | 'cancel'
  onClick?: () => void
}

const buttonSizes = {
  small: 'py-2 px-4 text-base',
  medium: 'py-3 px-5 text-medium',
  large: 'py-5 px-7 text-large',
}

const Button = ({
  children,
  fullWidth,
  size = 'small',
  disabled,
  type = 'button',
  onClick,
  model,
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        'rounded font-bold transition-opacity ease-in-out hover:opacity-90',
        fullWidth && 'w-full',
        buttonSizes[size],
        disabled && 'opacity-70 cursor-not-allowed',
        model === 'destroy'
          ? 'bg-red-600'
          : model === 'cancel'
            ? 'bg-slate-100'
            : 'bg-primary ',
      )}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
