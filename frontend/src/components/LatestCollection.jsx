
import React ,{useState,useContext, useEffect} from 'react'
import { ShopeContext } from '../context/ShopContext'
import Tittle from './Tittle';
import ProductItem from './ProductItem';

const LatestCollection = () => {

    const{products} = useContext(ShopeContext);
    const[latestProducts,setLatestProducts]=useState([]);

    useEffect(()=>{
           setLatestProducts(products.slice(0,10));
    },[products])

  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Tittle text1={'OUR'} text2={'SPECIALS'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>At PICK PURE PICKLE, we bring you a delightful range of traditional and handcrafted pickles made with love and the finest ingredients. Our pickles are a perfect blend of authentic recipes passed down through generations, combined with modern hygiene standards to ensure the best quality. From tangy mango and spicy lime to exotic mixed vegetable pickles, every jar is a burst of flavor that complements your meals beautifully. Whether you're reliving nostalgic tastes or exploring new flavors, our pickles promise to add a delicious twist to your dining experience. Taste tradition, one bite at a time!</p>
        </div>
      {/*Rendring products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-6'>
        {
            latestProducts.map((item,index)=>(
                <ProductItem key={index} id={item._id} images={item.images} name={item.name} price={item.price}/>
            ))
        }
      </div>
       
    </div>
  )
}

export default LatestCollection
