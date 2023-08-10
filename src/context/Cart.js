
import { useContext,useState,createContext, useEffect } from "react";




 const CartContext=createContext();

const CartProvider=({children})=>{

    const [cart,setCart]=useState([]);
    useEffect(()=>{
const existingItem=localStorage.getItem("cart");

if(existingItem){
    setCart(JSON.parse(existingItem))
}


    },[])
    return(
        <CartContext.Provider value={[cart,setCart]}>
{children}
        </CartContext.Provider>
    )
};
const useCart=()=>useContext(CartContext)

export{CartProvider,useCart}