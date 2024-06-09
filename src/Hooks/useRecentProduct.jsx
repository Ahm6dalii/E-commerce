import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useRecentProduct() {

async function getRecentProduct(){
    return  await axios.get("https://ecommerce.routemisr.com/api/v1/products");
}
 let responseObj= useQuery({
    queryKey:['recentProduct'],
    queryFn:getRecentProduct,
    staleTime:1000,
    refetchInterval:5000,
    // refetchOnMount:true,
    // refetchOnReconnect:true
    // refetchIntervalInBackground:true,
    // refetchOnWindowFocus:false
  })

  return responseObj
}
