import React from 'react'


const Tittle = ({text1,text2}) => {
  return (
    <div className='inline-flex gap-2 items-center mb-3'>
      <p className='text-gray'>{text1} <span className='text-gray-700 ml-3 font-medium'> {text2}</span></p>
      <p className='w-8 sm:w-12 h-[1px] bg-gray-700'></p>
    </div>
  )
}

export default Tittle
