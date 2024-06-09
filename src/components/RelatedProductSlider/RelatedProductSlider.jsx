import React, { useContext, useEffect, useState } from 'react'
import style from './RelatedProductSlider.module.css'
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import { CardContext } from '../../context/CardContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function RelatedProductSlider({relatedProduct}) {
  const [isAddToCard, setAddToCard] = useState(false);
  let { addToCard, setCardNumber } = useContext(CardContext);

    const[count,setcount]=useState(0)
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

      var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
      return (
        <Slider {...settings}>
          {relatedProduct?.map((product) => {
            return (
                 <div  key={product.id} className=" py-2 ">
                  <div className="product shadow-lg ">
                    <Link
                      to={`/productDetails/${product.id}/${product.category.name}`}
                    >
                      <img
                        src={product.imageCover}
                        className="w-full h-64 object-cover "
                        alt={product.title}
                      />
                      <div className="p-2">
                        <h3 className="text-green-500 font-light">
                          {product.category.name}
                        </h3>
                        <p className="font-semibold sm:text-[12px]">
                          {product.title.split(" ").slice(0, 2).join(" ")}
                        </p>
                        <div className="flex justify-between items-center mb-7">
                          <span className="font-semibold">
                            {product.price}{" "}
                            <span className="font-bold text-green-500">
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
                      className="btn text-white font-semibold w-[94%] ms-[1%] rounded-md absolute bottom-[-100px] transition-all duration-500"
                    >
                      {isAddToCard?<i className="fa-solid fa-spin fa-spinner"></i>:' Add to card'}
                  
                    </button>
                  </div>
                </div>
            )
        
          })}
        
        </Slider>
      );
}





