import React from 'react'

type InputProps = {
  label?: string
  id: string
  type?: 'password' | 'text' | 'number' | 'email'
  value: string | undefined
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
}

const Input = ({
  label,
  id,
  type = 'text',
  value,
  onChange,
  required,
}: InputProps) => {
  return (
    <div className="flex flex-col mb-2">
      {label && (
        <label htmlFor={id} className="mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        required={required}
        id={id}
        className="rounded bg-secondary outline-none p-2"
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default Input
