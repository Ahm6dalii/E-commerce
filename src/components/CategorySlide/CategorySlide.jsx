import React, { useEffect, useState } from 'react'
import 'swiper/css';
import axios from 'axios';
import { register } from 'swiper/element/bundle';


import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import Loading from './../Loading/Loading';

export default function CategorySlide() {
    const[catogery,setCatogery]=useState(null)
    register();
  
  async function getCategory(){
    const option={
      url:'https://ecommerce.routemisr.com/api/v1/categories',
      method:'GET'
    }
    let {data}=await axios.request(option)
    setCatogery(data.data)
  }
  useEffect(()=>{
    getCategory()
  },[])
  return (
<section className='my-2'>
    <h2 className='font-semibold px-2 mb-2'>Shop popular catogery</h2>
<swiper-container className='swiper  my-4'  autoplay-delay="2000"    slides-per-view={4}>
  {catogery? catogery.map((catogery)=>{
       return <swiper-slide  key={catogery._id}>
       <Link to={`/categories/${catogery._id}`}>
       <img src={catogery.image} className='w-full h-60  object-cover' alt="" />
        <h2>{catogery.name}</h2>
       </Link>
        </swiper-slide>
      }):<Loading/>}
</swiper-container>
</section>
   
  
  )
}
