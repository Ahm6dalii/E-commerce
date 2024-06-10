import React, { useContext, useEffect, useState } from 'react'
import style from './RecentProductCard.module.css'
import Loading from './../Loading/Loading';
import { CardContext } from '../../context/CardContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { WishListContext } from '../../context/WishLIstContext';
import axios from 'axios';

export default function RecentProductCard({product,wishIDs}) {
  let{addToCard,setCardNumber}=useContext(CardContext)
  let{addToWishCard,setWishNumber, getWishCard,deleteFromWishList}=useContext(WishListContext);
  
    const[isLoading,setLoading]=useState(false)
    const[selectToWish,setselectToWish]=useState(wishIDs?.includes(product.id))
    
    useEffect(()=>{
      setselectToWish(wishIDs?.includes(product.id))
    },[wishIDs])

    let opt={
      method:"GET",
      url:`https://ecommerce.routemisr.com/api/v1/wishlist`,
      headers:{
        token:localStorage.getItem('token')
        }
  }

    async function removeProductFromWishList(producdId){
    let{data}=await deleteFromWishList(producdId);
    setWishNumber(data?.data.length)
    setselectToWish(false)
    if(data.status=='success'){
     toast.success('Removed From wish List Successfully !');
    }else{
      toast.error('Failed to add to Wish List!')
    }
  }
    async function addProductToWishList(producdId){
    let{data}=await addToWishCard(producdId);
    setWishNumber(data?.data.length)
    setselectToWish(true)

    if(data?.status=='success'){
     toast.success('Added Wish List Successfully !');
    }else{
      toast.error('Failed to add to Wish List!')
    }
  }

    async function addProductToCard(producdId){
      setLoading(true)
    let response=await addToCard(producdId);
    setLoading(false)
    setCardNumber(response.data?.numOfCartItems)
    localStorage.setItem('cardNumber',response.data?.numOfCartItems)

    if(response.data?.status=='success'){
      toast.success('Added Successfully !');
      }else{
        toast.error('Failed to added to Cart !')
        }}
        
        
        function isAddedTowish(productId){
          if(selectToWish)
            {
                removeProductFromWishList(productId)
                }else{
                  addProductToWishList(productId)
              }         
              }
              

  return  <div   className=" sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 p-2 " >
             <div className="product shadow-lg rounded-lg hover:shadow hover:shadow-green-400 dark:bg-slate-700 ">
            <Link to={`/productDetails/${product.id}/${product.category?.name}`}>
                <img src={product.imageCover} className="w-full" alt={product.title} />
               </Link>
               <div className="p-3 ">
               <h3 className="text-green-500 font-light">{product.category?.name}</h3>
                <p className="font-semibold sm:text-[12px] line-clamp-1">{product.title}</p>  

                <div className="flex justify-between items-center mb-7">
                 <div className='flex flex-col '>
                  <span className="font-semibold">{product.price} <span className="font-bold text-green-500">EGP</span></span>  
                <span className="font-semibold">{product.ratingsAverage} <i className="fas fa-star text-yellow-400"></i></span>
                 </div>
                  <div>
                  <button disabled={isLoading} onClick={()=>{isAddedTowish(product.id),setselectToWish(!selectToWish)}} className="mx-2 text-white font-semibold  rounded-md  transition-all duration-500">  { selectToWish ? <i className='fas fa-heart fa-2xl text-red-700'></i> : <i className='fas fa-heart fa-2xl text-gray-400'></i>}
                 </button>
                </div> 
                </div>     
               </div>
               <div className='group-btn  flex '>
              
               </div>
              <button disabled={isLoading} onClick={()=> addProductToCard(product.id)} className="btn text-white font-semibold w-[98%] left-[1%] absolute bottom-[-100px] transition-all duration-200 rounded-md  ">  {isLoading? <i className="fa-solid fa-spin fa-spinner"></i>:' Add to card'}
              </button>  
  
              </div>
              </div>
 
}
