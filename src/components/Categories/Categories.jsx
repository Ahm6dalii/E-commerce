import React, { useEffect, useState } from 'react'
import style from './Categories.module.css'
import useCatogery from '../../Hooks/useCatogery'
import { Link } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { HelmetProvider,Helmet } from 'react-helmet-async';
  
export default function Categories() {
  let{data,isError,error,isLoading,isFetching}= useCatogery();
  console.log(data?.data?.data)

    useEffect(()=>{
     
    },[])

    if(isLoading)
      {
        return <LoadingScreen/>
      }

  return (
    <>
    <HelmetProvider>
    <Helmet>
    <title>FreshCart/Category</title>
  </Helmet>
    </HelmetProvider>
    <div className="flex flex-wrap pt-8 items-center  ">       
        {data?.data?.data.map((product) => {
         return  <div key={product._id} className="w-full sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 p-2 " >
        <div className="product shadow-lg pb-8 dark:bg-slate-700">
           <Link to={`/categories/${product._id}`}>
             <img src={product.image} className="w-full  sm:h-40 object-cover" alt={product.title} />
             <div className="p-2">
             <h3 className="text-green-500 font-light">{product.slug}</h3>
             <p className="font-semibold sm:text-[12px] line-clamp-1">{product.name}</p>  
             </div>
           </Link>
          </div>
          </div>
        })}
    </div>
  </>
  )
}
