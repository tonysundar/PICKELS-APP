import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopeContext = createContext();

const ShopeContextProvider = (props) => {
    const currency = '₹';
    const delivery_fee = 15;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search,setSearch] = useState("");
    const [showSearch,setShowsearch] = useState(false);
    const [cartItems, setCartItems]=useState({});
    const [products,setProducts] = useState([]);
    const navigate = useNavigate();

    const addToCart = async (itemId,size) =>{

            if(!size){
                toast.error('Select Pickle Quantity ')
                return;
            }

            let cartData = structuredClone(cartItems);
            if(cartData[itemId]){
                 if(cartData[itemId][size]){
                    cartData[itemId][size] += 1;
                 }
                 else{
                    cartData[itemId][size]= 1;
                 }
            }else{
               cartData[itemId] = {};
               cartData[itemId][size] = 1;
               }
               setCartItems(cartData);
            }
        
    const getCartAmount = () => {
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product)=> product.id === items);
            for(const item in cartItems[items]){
               try {
                if(cartItems[items][item]>0 ){
                    totalAmount += itemInfo.price * cartItems[items][item]

                }
                
               } catch (error) {
                
               } 
                
            }
        }
        return totalAmount;
    }
  
    const getCartCount = () =>{
        let totalCount = 0 ;
        for(const items in cartItems){
            for( const item in  cartItems[items]){
                try{
                    if(cartItems[items][item]>0){
                        totalCount += cartItems[items][item];
                    }
                }catch(error){

                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId,size,quantity) => {
             let cartData =structuredClone(cartItems);

             cartData[itemId][size]=quantity;

             setCartItems(cartData);
    }

     const getProductsData = async () => {
        try {
            
            const response = await axios.get("http://localhost:4000" + '/api/product/list')
            console.log(response)
             if(response.data.success){
               
                setProducts(response.data.products)
             }else{
                toast.error(response.data.message)
             }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

     }

     useEffect(()=>{
        getProductsData();
     },[])

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowsearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
         getCartAmount,
         navigate,
         backendUrl
    }
    return (
        <ShopeContext.Provider value={value}>
            {props.children}
        </ShopeContext.Provider>
    );
}




export default ShopeContextProvider;
