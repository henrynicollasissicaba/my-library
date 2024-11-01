import React from 'react'

interface BookTagsInterface {
    gender: string,
    numberOfPages: number,
    status: string
}

const BookTags = ({ gender, numberOfPages, status }: BookTagsInterface) => {
  return (
    <div className="flex justify-between my-8 bg-[#414141] p-4 rounded-md">
            <div className="flex items-center gap-3 flex-wrap">
                <p className="bg-blue-200 text-blue-500 px-4 py-1
                max-w-max rounded-3xl">
                    {gender}
                </p>
                <p className="bg-orange-200 text-orange-500 px-4 py-1
                max-w-max rounded-3xl">{numberOfPages} páginas</p>
                <span className={`${status === "Lido" ? 
                    "bg-green-300 text-green-600" : 
                    "bg-red-300 text-red-600"}
                    rounded-3xl px-4 py-1`}>
                        {status}
                </span>
            </div>
        </div>
  )
}

export default BookTags