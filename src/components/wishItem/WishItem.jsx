import React, { useContext, useEffect, useState } from 'react'
import style from './wishItem.module.css'
import { WishListContext } from '../../context/WishLIstContext';
import { List, Avatar } from "flowbite-react";
import toast from 'react-hot-toast';
import { CardContext } from '../../context/CardContext';

export default function WishItem({item,getWishListItem}) {
    const[isAddLoading,setAddLoading]=useState(false)
    const[isRemoveWishLoading,setRemoveWishLoading]=useState(false)
    let{addToWishCard,wishNumber,setWishNumber, getWishCard,deleteFromWishList}=useContext(WishListContext);
    let{addToCard,setCardNumber}=useContext(CardContext)

    useEffect(()=>{

    },[])
    async function removeProductFromWishList(producdId){
      setRemoveWishLoading(true)
      let{data}=await deleteFromWishList(producdId);
      setWishNumber(data?.data.length)
       setRemoveWishLoading(false)
      if(data.status=='success'){
       toast.success('Removed From wish List Successfully !');
      }else{
        toast.error('Failed to add to Wish List!');
      }
    }
    async function removeProductAfterAdd(producdId){
      let{data}=await deleteFromWishList(producdId);
      setWishNumber(data?.data.length)
       setRemoveWishLoading(false)
    }
    async function addProductToCard(producdId){
     setAddLoading(true)
    let response=await addToCard(producdId);
   setAddLoading(false)
    setCardNumber(response.data?.numOfCartItems)

    if(response.data?.status=='success'){
      toast.success('Added Successfully !');
      }else{
        toast.error('Failed to added to Cart !')
        }}
        
  return (
    <>
   <List.Item key={item._id} className="p-2 sm:pb-4 border-non">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className='basis-20'>
            <img src={item.imageCover} alt={item.title} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm mb-1 text-black dark:text-gray-400 text-wrap "> {item.title}</p>
            <p className="truncate mb-1 text-sm font-medium text-green-500 dark:text-white">{item.price} EGP</p>
         <button onClick={()=>removeProductFromWishList(item.id)} className=" py-[1px]  font-normal  bg-red-500 text-white transition-all duration-300 hover:text-red-500 hover:bg-white ml-auto p-3 rounded-xl dark:text-red-500 hover:outline hover:outline-1 hover:outline-red-500">{isRemoveWishLoading? <i className="fa-solid fa-spin fa-spinner"></i>:'Remove'}</button>
          </div>

          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          <button  onClick={(isAddLoading)=> {addProductToCard(item.id),removeProductAfterAdd(item.id)}} className="btn py-[1px] text-white font-normal   transition-all duration-500 rounded-md  "> {isAddLoading? <i className="fa-solid fa-spin fa-spinner"></i>:' Add to card'}</button>
          
          </div>
        </div>
      </List.Item>
    </>
  )
}
