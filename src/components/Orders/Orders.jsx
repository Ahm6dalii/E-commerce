import React, { useContext, useEffect, useState } from 'react'
import style from './Orders.module.css'
import { userContex } from '../../context/userContext'
import axios from 'axios'
import { List, Avatar } from "flowbite-react";
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { HelmetProvider,Helmet } from 'react-helmet-async';

export default function Orders() {
    const[userOrder,setUserOrder]=useState(null)
    const[userOrderErr,setUserOrderErr]=useState(false)
    const[isLoading,setLoading]=useState(false)
    let {userInfo}=useContext(userContex)
    
   
    useEffect(()=>{
      getUserOrder()
    },[userOrderErr])

    async function getUserOrder(){
      setLoading(true)
      try{
        let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userInfo.id}`)
        setUserOrder(data)
        setLoading(false)

      }catch(err){
        setLoading(false)
        setUserOrderErr(true)
      }

    }
  return (
    <>
  <HelmetProvider>
      <Helmet>
    <title>FreshCart/Order</title>
  </Helmet>
  </HelmetProvider>
    {isLoading?<LoadingScreen/>:  <List unstyled className="px-4 pt-3 max-w-md divide-y divide-gray-200 dark:divide-gray-700">
    <h2 className='text-[20px] font-medium '>My Orders</h2>
    
      {userOrder?.map((order)=>{
        return  <List.Item key={order._id} className="p-2 sm:pb-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm text-gray-500 dark:text-gray-400"><span>Date :</span> {order.createdAt.split('T').join(' ').split(/\.[0-9A-Za-z]{0,}/)}</p>
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white"><span>Payment : </span>{order.paymentMethodType
            }</p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">{order.totalOrderPrice} LE</div>
        </div>
      </List.Item>
                
      })}
    </List>
  }
  
    </>
  )
}
