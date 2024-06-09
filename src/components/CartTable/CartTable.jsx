import React, { useEffect, useState } from 'react'
import style from './CartTable.module.css'
import CartProduct from '../CartProduct/CartProduct'

export default function CartTable({updateQantityItems,cartDetails,isloadingRemove,setCartDetails}) {
    const[count,setcount]=useState(0)
    useEffect(()=>{

    },[])
  return (
    <>
  <table className="text-center w-fit  md:w-full md:text-sm text-xs  rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
     <tr>
                <th scope="col" id='www' className="px-0 py-3">
                    <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-1 py-3">
                    Product
                </th>
                <th scope="col" className="px-1 py-3">
                    Qty
                </th>
                <th scope="col" className="px-1 py-3">
                    Price
                </th>
                <th scope="col" className="px-1 py-3">
                    Action
                </th>
            </tr>
        </thead>
       
        <tbody>
        {cartDetails?.data?.products?.map((product)=>{
            return <CartProduct key={product?._id} setCartDetails={setCartDetails} updateQantityItems={updateQantityItems} product={product} />
            
          })}      
        </tbody>
        <tfoot>
            <tr>
            <td className='text-start bg-slate-100 p-3 text-[28px] font-semibold' colSpan={3}>Total Price</td>
            <td colSpan={2}  className='text-center text-green-500 text-[25px]'>{cartDetails?.data?.totalCartPrice} EG</td>
            </tr>
        </tfoot>
    </table>
    </>
  )
}
