import React, { useContext, useEffect, useState } from 'react'
import { ShopeContext } from '../context/ShopContext'
import Tittle from './Tittle';


import ProductItem from './ProductItem';

const BestSeller = () => {
    const{products}=useContext(ShopeContext);
    const [bestSeller,setBestSeller]=useState([]);

    useEffect(()=>{
          const bestProduct = products.filter((item)=>(item.bestseller))
          setBestSeller(bestProduct.slice(0,10));
    },[products])
  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Tittle text1={'TASTY'} text2={'   PICKLES'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            At Pick Pure Pickle, we take pride in offering a unique selection of handcrafted pickles made with the finest ingredients. Each jar is filled with authentic, traditional flavors that bring a burst of taste to your meals. Whether it’s our tangy mango, spicy lime, or aromatic mixed vegetable pickles, every variety is carefully prepared to ensure the highest quality. Our pickles are not just a treat for your taste buds, but a celebration of rich heritage, prepared with love and passion to bring the authentic taste of tradition to your dining table
            </p>
    </div>
        
         <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
              {
                bestSeller.map((item,index)=>(
                   <ProductItem key={index} id={item._id} name={item.name} images={item.images} price={item.price} />
                ))
              }
            </div> 
            
    </div>
  )
}

export default BestSeller
