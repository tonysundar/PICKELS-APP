import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
             <div>
                <Link to='/'> <img src={assets.picklelogo} alt='' className='mb-5 w-20 h-15'/></Link>
                  <p className='w-full md:w-2/3 text-gray-600'>
                    Bringing tradition to your table, one jar of Pick Pure Pickle at a time. Taste the heritage!
                    </p>
             </div>
             <div>
                <p className='text-xl font-medium mb-5'>OUR STORE</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                 <li>Home</li>
                 <li>About us</li>
                 <li>Delivery</li>
                 <li>Privacy & Policy</li>
                </ul>
             </div>

             <div>
                <p className='text-xl font-medium mb-5'>CONTACT US 24/7</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                   <li>+91 8688692101</li>
                   <li>Tonysundar@gmail.com</li>
                   <li>Ravulapalem</li>
                   <li>West Godhavari,Andhra.</li>
                   
                </ul>
             </div>
         
      </div>
      <div>
             <hr/>
             <p className='py-5 text-sm text-center'>Copyright 2024@ purepickle.com - All Rights Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
