import React from 'react'
import { register } from 'swiper/element/bundle';
import img1 from '../../assets/images/slider-image-1.jpeg'
import img2 from '../../assets/images/slider-image-2.jpeg'
import img3 from '../../assets/images/slider-image-3.jpeg'
import 'swiper/css';


export default function HomeSlider() {
    register();
  return (
<>
<section className='grid grid-cols-12'>
    <div className='col-span-8'>
    <swiper-container className='mySwiper h-96  my-4'  style={{height:"100%"}}  centered-slides="true" autoplay-delay="2500" >
    <swiper-slide>
    <img src={img1} className='w-full block h-full object-cover' alt="img1" />
    </swiper-slide>
    <swiper-slide>
    <img src={img2} className='w-full block h-full object-cover' alt="img2" />
    </swiper-slide>
    <swiper-slide>
    <img src={img3} className='w-full block h-full object-cover' alt="img3" />
    </swiper-slide>

</swiper-container>
    </div>
    <div className='col-span-4 bg-lime-500'>
        <div>
    <img src={img2} className='w-full block h-full object-cover' alt="img2" />
        </div>
        <div>
    <img src={img3} className='w-full block  h-full object-cover' alt="img3" />
        </div>
    </div>
</section>
</>

  )
}
