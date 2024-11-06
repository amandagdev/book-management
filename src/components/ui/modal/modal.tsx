import React, { type ReactNode } from 'react'

const Modal = ({ children }: { children: ReactNode }) => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-[rgba(0,0,0,0.6)]">
      {children}
    </div>
  )
}

export default Modal
