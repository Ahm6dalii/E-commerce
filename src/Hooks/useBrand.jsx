import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useBrand() {
    async function getBrands(){
        return  await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
    }
    let responseObj= useQuery({
        queryKey:['recentBrands'],
        queryFn: getBrands(),
        staleTime:1000,
        refetchInterval:5000,
    
      })
    
      return responseObj
}
