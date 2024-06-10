import React, { useContext, useEffect, useState } from 'react'
import { CardContext } from '../../context/CardContext';

export default function CartProduct({product,setCartDetails,removeCardItems}) {
    let{getCard,removeCard,cardNuber,setCardNumber,updateQantity,removeAllCard}=useContext(CardContext)
    let [isRemoveLoading,setRemoveLoading]=useState(false);
    let[productCount,setProductCount]=useState(product.count)

    async function removeCardItems(productId){
        setRemoveLoading(true)
      let respose= await removeCard(productId);
      setRemoveLoading(false)
      localStorage.setItem('cardNumber',respose.data?.numOfCartItems)
      setCartDetails(respose.data)
      setCardNumber(respose.data.numOfCartItems)
      console.log('ssssss',respose.data)

    }
    async function updateQantityItems(productId,count){
        if(count<1)
            {
                removeCardItems(productId)
              
            }else{
                let respose= await updateQantity(productId,count);
                setCartDetails(respose.data)
                localStorage.setItem('cardNumber',respose.data?.numOfCartItems)
            }
    }
  
  return (
    <tr key={product?.product?.id}  className=" pb-20 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    <td className="py-4 pl-2 w-[10%]">
        <img src={product?.product?.imageCover} className="w-16  md:w-32 max-w-full max-h-full" alt="Apple Watch"/>
    </td>
    <td className="px-1 md:text-sm py-4 font-semibold text-gray-900 dark:text-white">
    {product?.product?.title}
    </td>
    <td className="px-1 py-4">
        <span className="flex justify-center items-center">
            <button onClick={()=> {updateQantityItems(product?.product?.id,productCount-1); setProductCount(productCount-1)}} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-5 w-5  text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                <span className="sr-only">Quantity button</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                </svg>
            </button>
            <span className='font-semibold text-[16px] dark:text-[#eee]'>
        {productCount}      
             </span>
            <button  onClick={()=> {updateQantityItems(product?.product?.id,productCount+1); setProductCount(productCount+1)}} className="inline-flex items-center justify-center h-5 w-5 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                <span className="sr-only">Quantity button</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                </svg>
            </button>
        </span>
    </td>
    <td className="px-1 py-4 font-semibold text-gray-900 dark:text-white">
    {product.price * productCount}

    </td>
    <td className="px-1 py-4">
        <button disabled={isRemoveLoading}   onClick={()=>removeCardItems(product.product.id)} href="#" className="font-medium fa-lg bg-red-500 text-white transition-all duration-300 hover:text-red-500 hover:bg-white ml-auto p-3 rounded-xl dark:text-white dark:hover:text-red-500 hover:outline hover:outline-1 hover:outline-red-500">{isRemoveLoading?<i className='fas fa-spinner fa-spin'></i>:" Remove"}</button>
    </td>
    
  
</tr>

  )
}
