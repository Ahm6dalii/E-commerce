import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useCatogery() {
    async function getCatogey(){
        return  await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    }
    let responseObj= useQuery({
        queryKey:['recentcategories'],
        queryFn:getCatogey,
        staleTime:1000,
        refetchInterval:5000,
    
      })
    
      return responseObj
}
