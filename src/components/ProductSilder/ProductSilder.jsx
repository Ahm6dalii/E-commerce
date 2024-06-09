import React from 'react'

export default function ProductSilder(pro) {
  return (
    <swiper-container  autoplay-delay="2000"  slides-per-view={4} >
    {ProductsDetails?.images.map((image,index)=>{
    return<>
     <swiper-slide key={index}>
  <img src={image} className='cursor-pointer w-20' onClick={()=>setimageSlide(image)} alt="" />
  </swiper-slide>
    </>
    }
    
  )}
  </swiper-container>
  )
}
