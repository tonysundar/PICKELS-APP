import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink,Link } from 'react-router-dom'
import { ShopeContext } from '../context/ShopContext';

const Navbar = () => {
  const[visible,setVisible] = useState(false);
  const {setShowsearch,getCartCount,navigate,token,setToken,setCartItems} = useContext(ShopeContext)
    const logout = () => {
      navigate('/login')
      localStorage.removeItem('token');
      setToken('');
      setCartItems({});
    
    }
  return (
    <div className='flex items-center justify-between mb-3 p-1 font-medium navbarbg '>
     <Link to='/'> <img src={assets.mango} className='w-20 h-20  rounded-full object-cover' alt=''/></Link>
       <ul className='hidden sm:flex gap-5 text-sm text-gray-700 '>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
         <p>HOME</p>
         <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
        <NavLink to='/Pickles' className='flex flex-col items-center gap-1'>
         <p>PICKLES</p>
         <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
        <NavLink to='/About' className='flex flex-col items-center gap-1'>
         <p>ABOUT</p>
         <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
        <NavLink to='/Contact' className='flex flex-col items-center gap-1'>
         <p>CONTACT</p>
         <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
       </ul>
       <div className='flex items-center gap-6'>
             <img onClick={()=>setShowsearch(true)} src={assets.searchlogo} className='w-5 cursor-pointer'alt=''/>
             <div className='group relative'>
              <img onClick={()=>token ? null : navigate('/login')} className='w-5 cursor-pointer' src={assets.profile} alt=''/> 
                 {token && <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                    <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                       <p className='cursor-pointer hover:text-black'>My Profile</p>
                       <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                       <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                    </div>
                      </div>}
                 
                 
                      
               
             </div>
             <Link to='/Cart' className='relative'>
                <img src={assets.cartlogo}  className='w-5 min-w-5 'alt=''/>
                 <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
             </Link>
             <img onClick={()=>setVisible(true)} src={assets.menuicon} className='w-5 cursor-pointer sm:hidden ' alt=''/>
       </div>
       {/* Sidebar Menu for small screen*/}
       <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full':'w-0'}`}>
            <div className='flex flex-col text-gray-600'>
                <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                     <img className='h-4 rotate-180 ' src={assets.dropdown} alt=''/>
                      <p>Back</p>
                </div>
                
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border'to='/'>HOME</NavLink>
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border'to='/Pickles'>SHOP</NavLink>
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border'to='/About'>ABOUT US</NavLink>
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border'to='/Contact'>CONTACT US</NavLink>
            </div>
       </div>
    </div>
  )
}

export default Navbar
