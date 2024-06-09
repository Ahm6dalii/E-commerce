import React, { useEffect, useState } from 'react'
import style from './CategoriesDetails.module.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import ProductDetails from '../ProductDetails/ProductDetails';
import { HelmetProvider,Helmet } from 'react-helmet-async';

export default function CategoriesDetails() {
    let {id}=useParams();
    const[catogeryDetails,setCatogeryDetails]=useState(0)
    useEffect(()=>{
      getCatogeryDetials()
    },[])
    
    async function getCatogeryDetials(){
      axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
      .then(({data})=>{
        setCatogeryDetails(data.data)
        
    
      }).catch(((err)=>err))
        }
  return (
    <>
    <HelmetProvider>
  <Helmet>
    <title>FreshCart/CatogeryDetails</title>
  </Helmet>
    </HelmetProvider>
    <div className="flex flex-wrap pt-8 items-center  ">       
    
   <div className=" w-2/4 m-auto" >
            <img src={catogeryDetails.image} className="w-full  " alt={catogeryDetails.title} />
           <div className="p-2">
           <h3 className="text-green-500 font-light text-[25px]">{catogeryDetails.slug}</h3>
            <p className="font-semibold sm:text-[12px] text-[25px] line-clamp-1">{catogeryDetails.name}</p>  

          </div>
          </div>
       

      </div>
</>
)
  }
