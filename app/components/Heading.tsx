import React from "react"

const Heading = ({ children } : {
    children: React.ReactNode
}) => {
  return (
    <h1 className="text-3xl sm:text-4xl font-bold text-[#ecebeb] mb-12">{children}</h1>
  )
}

export default Heading