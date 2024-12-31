import React, { useContext, useEffect, useState } from 'react'
import { ShopeContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const {search,setSearch,showSearch,setShowsearch} = useContext(ShopeContext);
    const [visible,setVisible]= useState(false);
    const location = useLocation();
     useEffect(()=>{
         if(location.pathname.includes('Pickles')){
            setVisible(true);
         }
         else{
            setVisible(false)
         }
     },[location])

  return showSearch && visible ? (
    <div className='border-t border-b bg-success-50 text-center'>
      <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2  my-5 mx-3 rounded-full w-3/4 sm:1/2'>
            <input value={search} onChange={(e)=>setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-small' type="text" placeholder='Search'/>
             <img className='w-4' src={assets.searchlogo} alt=''/>
      </div>
      <img onClick={()=>setShowsearch(false)}  className='inline w-3 cursor-pointer'src={assets.cross_icon} alt=''/>
    </div>
  ) : null
}

export default SearchBar
