import React from 'react'

const Error = ({children}:{children: React.ReactNode}) => {
  return (
    <p className='text-red-400'>{children}</p>
  )
}

export default Error
