import React, { useContext } from 'react'
import { ShopeContext } from '../context/ShopContext'
import Tittle from '../components/Tittle'


const Order = () => {
  const {products,currency} = useContext(ShopeContext)
  return (
    <div className='border-t pt-16'>

      <div className='text-2xl'>
              <Tittle text1={'YOUR'} text2={'ORDERS'}/>
      </div>
          <div>
           {
            products.slice(1,4).map((item,index)=>(
              <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 '>
              <div className='flex items-start gap-6 text-sm'>
               <img className='w-16 sm:w-20' src={item.images[0]} alt=''/>
                  <div>
                  <p className='sm:text base font-medium'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                        <p>{currency} {item.price[0]}</p>
                         <p>Quantity:1 </p>
                         <p>Size: {item.sizes[0]}</p>
                    </div>
                    <p>Date:<span className='text-gray-400'>19 dec2024</span></p>
                    </div>
                   </div>
                   <div className='md:w-1/2 flex justify-between'>
                      <div className='flex items-center gap-2'>
                      <p className='min-w-2 h-2 rounded-full bg-green-300'></p>
                      <p className='text-sm md:text-base'>Ready to ship</p>
                       </div>
                       <button className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
                   </div>
                 </div>
            ))
           }      

           </div>      
    </div>
  )
}

export default Order
