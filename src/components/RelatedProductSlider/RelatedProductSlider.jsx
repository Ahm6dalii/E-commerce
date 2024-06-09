import React, { useContext, useEffect, useState } from 'react'
import style from './RelatedProductSlider.module.css'
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import { CardContext } from '../../context/CardContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from 'react-hot-toast';

export default function RelatedProductSlider({product}) {
  const [isAddToCard, setAddToCard] = useState(false);
  let { addToCard, setCardNumber } = useContext(CardContext);

    const[isloading,setloading]=useState(false)
    useEffect(()=>{

    },[])
    
    async function addProductToCard(producdId) {
      setAddToCard(true)
      let response = await addToCard(producdId);
      setAddToCard(false)
  
    let headers={
      token:localStorage.getItem('token')
  }
  
  
      setCardNumber(response.data?.numOfCartItems);
      localStorage.setItem("cardNumber", response.data?.numOfCartItems);

      if (response.data?.status == "success") {
        toast.success("Added Successfully !");
      } else {
        toast.error("Failed to dded Successfully !");
      }
    }

      return (
        <swiper-slide >
        <div className="  ">
          <div className="product shadow-lg  mt-2 ">
            <Link
              to={`/productDetails/${product.id}/${product.category.name}`}
            >
              <div className="sm:h-[300px] h-[150px]">
              <img
                src={product.imageCover}
                className="w-full h-full object-cover"
                alt={product.title}
              />
              </div>
              <div className="p-2">
                <h3 className="text-green-500 font-light text-[12px] sm:text-[16px]">
                  {product.category.name}
                </h3>
                <p className="font-semibold text-[12px] sm:text-[16px]">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </p>
                <div className="flex justify-between text-[13px] sm:text-[16px] items-center mb-7">
                  <span className="font-semibold">
                    {product.price}{" "}
                    <span className="font-bold  text-green-500">
                      EGP
                    </span>
                  </span>
                  <span className="font-semibold">
                    {product.ratingsAverage}{" "}
                    <i className="fas fa-star text-yellow-400"></i>
                  </span>
                </div>
              </div>
            </Link>

            <button
            disabled={isAddToCard}
              onClick={() => addProductToCard(product.id)}
              className="btn text-[12px] sm:text-[16px] text-white font-semibold w-[94%] ms-[1%] rounded-md absolute bottom-[-100px] transition-all duration-500"
            >
              {isAddToCard?<i className="fa-solid fa-spin fa-spinner"></i>:' Add to card'}
          
            </button>
          </div>
        </div>
      </swiper-slide>
        
          )}
        
      





