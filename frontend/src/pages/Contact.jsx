import React from 'react'



import Tittle from '../components/Tittle'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 border-t'>
          <Tittle text1={'CONTACT'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.banner} alt=''/>
        <div className='flex flex-col justify-center items-start gap-6'>
            <p className='font-semibold text-xl text-gray-600'>Out Store</p>
            <p className='text-gray-500'>54700 vanasthalipuram <br/>beside MoreMoarket ,below SIIT institute,Hyderabad</p>
            <p className='text-gray-500'>Tel: 8688692101 <br/>Email:tonysundar@gmail.com</p>
           
        
            <button className='border border-black px-8 py-4 text-sm hover:bg-green-300 hover:text-black transition-all duration-500'>PURCHASE PURE PICKLES</button>
        </div>
      </div>

      
    </div>
  )
}

export default Contact
