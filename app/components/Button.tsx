import React from 'react'

const Button = ({ label, className, onClick } : {
    label: string,
    className?: string,
    onClick?: () => void
}) => {
  return (
    <button className={`px-4 py-2 rounded-md shadow-md font-medium w-full md:w-auto ${className}`}
                    onClick={onClick}>
                        {label}
                    </button>
  )
}

export default Button