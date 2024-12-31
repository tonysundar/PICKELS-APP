import React from 'react'

import { assets } from '../assets/assets'
import Tittle from '../components/Tittle'


const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
             <Tittle text1={'ABOUT'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img className='w-full md:max-w-[450px]' src={assets.banner} alt=''/>
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
             <p>Welcome to Pure Pickles, your ultimate destination for authentic, homemade pickles crafted with love and care! At Pure Pickles, we pride ourselves on delivering the rich, traditional flavors of pickles made from the finest, all-natural ingredients. Each jar is a celebration of heritage.</p>
             <b className='text-gray-800'>Our Mission</b>
             <p> Our wide range of pickles includes vegetarian and non-vegetarian varieties, catering to every palate and preference. Whether it’s the tangy zest of mango, the fiery spice of chili, or the hearty goodness of mixed vegetables, we’ve got something for everyone. Say goodbye to artificial preservatives and chemicals—at Pure Pickles, we believe in purity, quality, and the joy of savoring authentic flavors.</p>
          </div>
      </div>

      <div className='text-xl py-4'>
          <Tittle text1={'WHY'} text2={'CHOOSE US'}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10  md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance :</b>
          <p className='text-gray-600'>"PIC PURE PICKLE is committed to ensuring customer satisfaction through quality products and reliable service, providing peace of mind with every purchase."</p>
        </div>
        <div className='border px-10  md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience :</b>
          <p className='text-gray-600'>"PIC PURE PICKLE prioritizes convenience, offering a seamless shopping experience with user-friendly navigation and fast delivery options."</p>
        </div>
        <div className='border px-10  md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service :</b>
          <p className='text-gray-600'>"PIC PURE PICKLE is dedicated to delivering exceptional service, ensuring every customer feels valued and supported throughout their shopping journey."</p>
        </div>
      </div>
      
    </div>
  )
}

export default About
