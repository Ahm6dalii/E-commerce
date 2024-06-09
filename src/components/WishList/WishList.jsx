import React, { useContext, useEffect, useState } from 'react'
import style from './WishList.module.css'
import { userContex } from '../../context/userContext'
import axios from 'axios'
import { List, Avatar } from "flowbite-react";
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { WishListContext } from '../../context/WishLIstContext';
import toast from 'react-hot-toast';
import WishItem from '../wishItem/WishItem';
import { HelmetProvider,Helmet } from 'react-helmet-async';

export default function WishList() {
    const[count,setcount]=useState(0)
    const[wishItems,setwishItems]=useState(null)
    const[wishItemsErr,setwishItemsErr]=useState(false)
    const[isLoading,setLoading]=useState(false)
    let{wishNumber,setWishNumber, getWishCard,deleteFromWishList}=useContext(WishListContext);

    useEffect(()=>{
      getWishListItem()
    },[wishItemsErr,wishNumber])

    let opt={
      method:"GET",
      url:`https://ecommerce.routemisr.com/api/v1/wishlist`,
      headers:{
        token:localStorage.getItem('token')
      }
  }
    async function  getWishListItem(){
      setLoading(true)
      try{
        let {data}=await axios.request(opt)
        console.log(data)
        setwishItems(data)
        setLoading(false)

      }catch(err){
        setLoading(false)
        setwishItemsErr(true)
      }

    }

   
  return (
    <>
    <HelmetProvider>
     <Helmet>
    <title>FreshCart/WishList</title>
  </Helmet>
    </HelmetProvider>
    {false ?<LoadingScreen/>:  <List unstyled className="px-4 pt-3 max-w-full divide-y divide-gray-200 dark:divide-gray-700">
<div className='flex justify-between items-center'>
    <h2 className='text-[20px] font-medium  flex items-center gap-2'>

    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z" clipRule="evenodd" />
</svg>
      My Wish List
      </h2>
<p><span>Wish Items : </span><span>{wishItems?.count}</span></p>
</div>
      {wishItems?.data?.map((item)=>{
        return  <WishItem key={item.id} item={item} getWishListItem={getWishListItem}/>
                
      })}
    </List>
  }
  
    </>
  )
}
