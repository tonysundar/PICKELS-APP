import React,{useContext, useState,useEffect} from 'react'
import Tittle from '../components/Tittle'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopeContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'


const Placeorder = () => {
  const [method, setMethod] =  useState('cod');
  const {navigate,backendUrl,token,cartItems,setCartItems,getCartAmount,delivery_fee,products,user} = useContext(ShopeContext);
   
  const [formData,setFormData] = useState({
    firstName:'',
    lastName:'',
    email: user?.email || '',
    street:'',
    city:'',
    state:'',
    pincode:'',
    country:'',
    phone:''
})
// Update email if user logs in after initial render
useEffect(() => {
  if (user?.email) {
    setFormData(prevData => ({ ...prevData, email: user.email }));
  }
}, [user]);
const onChangeHandler = (event) => {
  const name = event.target.name;
  const value = event.target.value

  setFormData(data => ({...data,[name]:value}))

}

const onSubmitHandler = async (event) => {
  event.preventDefault()
  try {

        let orderItems = []
        
        for(const items in cartItems){
           for(const item in cartItems[items]){
              if(cartItems[items][item] > 0) {
                    const itemInfo = structuredClone(products.find(product => product._id === items))
                    if(itemInfo){
                          itemInfo.size = item
                          itemInfo.quantity = cartItems[items][item]
                          orderItems.push(itemInfo)
                    }
              }
           }
        }

        let orderData = {
              address: formData,
              items:orderItems, 
              amount:getCartAmount() + delivery_fee
        }

        switch(method){
              /*API call for CASH ON DELIVERY
              case 'cod':
                    
                       const response = await axios.post("https://pickels-app-1.onrender.com" + '/api/order/place',orderData,{headers:{token}})
                       if(response.data.success){
                          setCartItems({})
                          navigate('/orders')
                          toast.success(response.data.message);
                       }
                       else{
                          toast.error('select payment');
                       }

              break;*/

              case 'stripe':
                    const responseStripe = await axios.post(backendUrl + '/api/order/stripe',orderData,{headers:{token}})
                     if(responseStripe.data.success){
                          const {session_url} = responseStripe.data
                          window.location.replace(session_url)
                     }else{
                      toast.error(responseStripe.data.message)
                     }


              break;


              default:
                toast.error('Select PAYMENT')
                    break;
        }
        
  } catch (error) {
      
        toast.error(error.message)
  }
}



 
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
          
          <div className='text-xl sm:text-2xl my-3'>
             <Tittle text1={'DELIVERY'} text2={'ADDRESS'}/>
          </div>
          <div className='flex gap-3'>
             <input required  onChange={onChangeHandler} name='firstName' value={formData.firstName} type='text' placeholder='First name'  className='border border-gray-300 rounded  py-1.5 px-3.5 w-full' />
             <input required  onChange={onChangeHandler} name='lastName' value={formData.lastName} type='text' placeholder='Lirst name'  className='border border-gray-300 rounded  py-1.5 px-3.5 w-full' />
          </div> 
          <input required  onChange={onChangeHandler} name='email' value={formData.email} type='email' placeholder='Email'   className='border border-gray-300 rounded  py-1.5 px-3.5 w-full' />
          <input required  onChange={onChangeHandler}  value={formData.street} type='text' placeholder='street name'name='street'  className='border border-gray-300 rounded  py-1.5 px-3.5 w-full' />
          <div className='flex gap-3'>
             <input required  onChange={onChangeHandler} name='city' value={formData.city} type='text' placeholder='City'className='border border-gray-300 rounded  py-1.5 px-3.5 w-full' />
             <input required  onChange={onChangeHandler} name='state' value={formData.state} type='text' placeholder='State'  className='border border-gray-300 rounded  py-1.5 px-3.5 w-full' />
          </div> 
          <div className='flex gap-3'>
             <input required  onChange={onChangeHandler} name='pincode' value={formData.pincode} type='text' placeholder='Pincode'  className='border border-gray-300 rounded  py-1.5 px-3.5 w-full' />
             <input required  onChange={onChangeHandler} name='country' value={formData.country} type='text' placeholder='Country' className='border border-gray-300 rounded  py-1.5 px-3.5 w-full' />
          </div> 
          <input required  onChange={onChangeHandler} name='phone' value={formData.phone} type='number' placeholder='phoneNumber'  className='border border-gray-300 rounded  py-1.5 px-3.5 w-full' />
      </div>
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal/>

        </div>

        <div className='mt-12'>
          <Tittle text1={'PAYMENT'} text2={'METHOD'}/>
          <div className='flex gap-3 flex-col lg:flex-row'>
               <div onClick={()=>setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
               <p className={`min-w-3.5 h-3.5 border rounded-full  ${method === 'stripe' ? 'bg-green-400': ''}  `}></p>
               <img className='h-5 mx-4 ' src={assets.stripe_logo} alt=''/>
               </div>

               
          </div>
          <div className='w-full text-end mt-8'>
           <button  type='submit' className='bg-green-300 text-black px-16 py-3 text-sm rounded'>PLACE ORDER</button>
           </div>
                


        </div>

      </div>
    </form>
  )
}

export default Placeorder
