import { createContext, useEffect, useState } from "react";
import WishList from './../components/WishList/WishList';
import axios from "axios";

export let WishListContext =createContext()

export default function WishListProvider(props)
{
    let [isLoadingWish,setLoadingWish]=useState(false)
    let [wishDat,setWishData]=useState(null)
    let [wishNumber,setWishNumber]=useState(0)

    let headers={
        token:localStorage.getItem('token')
    }
useEffect(()=>{
    getWishCard()
},[])
    function addToWishCard(productId){
        return   axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',{
            productId:productId
        },{
            headers
        }).then((respose)=>respose)
        .catch((error)=>error)
    }
    function deleteFromWishList(productId){ 
        return   axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
            headers
        }).then((respose)=>respose)
        .catch((error)=>error)
    }
    async function getWishCard(){
        setLoadingWish(true)
     
       await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',{
            headers
        }).then((respose)=>{
            setWishData(respose?.data?.data)
            setWishNumber(respose?.data?.count)
            setLoadingWish(false)
            return respose;
        })
        .catch((error)=>{
            setLoadingWish(false)
            return error
        })
   
    }
 
    
    return <WishListContext.Provider value={{getWishCard,deleteFromWishList,addToWishCard,wishNumber,setWishNumber,setLoadingWish,isLoadingWish,wishDat, getWishCard}}>
        {props.children}
    </WishListContext.Provider>
}