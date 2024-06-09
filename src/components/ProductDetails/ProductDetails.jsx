import React, { useContext, useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { register } from "swiper/element/bundle";
import "swiper/css";
import { CardContext } from "../../context/CardContext";
import toast from "react-hot-toast";
import ImageGallery from "react-image-gallery";
import ReactImageGallery from "react-image-gallery";
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function ProductDetails() {
  let { addToCard } = useContext(CardContext);
  let { setCardNumber } = useContext(CardContext);
  let [imgSlide, setimageSlide] = useState("");
  register();
  let { id, category } = useParams();
  const [ProductsDetails, setProductsDetails] = useState(null);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [isAddToCard, setAddToCard] = useState(false);

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

  async function getProductDetials() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProductsDetails(data.data);
        setLoading(true);
      })
      .catch(() => {});
  }
  async function getRelatedProduct(category) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        let allProduct = data.data;
        let relatedProducts = allProduct.filter(
          (product) => product.category.name == category
        );
        setRelatedProduct(relatedProducts);
      })
      .catch(() => {});
  }
  useEffect(() => {
    getProductDetials();
    setimageSlide("");
  }, [id]);
  useEffect(() => {
    getRelatedProduct(category);

    // const swiperEl = document.querySelector('swiper-container')
    // Object.assign(swiperEl, {
    //   spaceBetween: 10,
  
    //   breakpoints: {
    //     640: {
    //       slidesPerView: 3,
    //       spaceBetween: 20,
    //     },
    //     768: {
    //       slidesPerView: 4,
    //       spaceBetween: 40,
    //     },
    //     1024: {
    //       slidesPerView: 5,
    //       spaceBetween: 50,
    //     },
    //   },
    // });
    // swiperEl.initialize();
  }, []);
  const images = ProductsDetails?.images.map((img) => {
    return   {
        original:img,
        thumbnail:img
      }
  });
  
  return (
    <>
       <HelmetProvider>
      <Helmet>
    <title>FreshCart/ProductDetail</title>
  </Helmet>
  </HelmetProvider>
   
      <div className="row items-center mb-3">
        <div className="w-full   md:w-2/4 px-3">
             <ReactImageGallery  items={ images?images:[]}
            showFullscreenButton={false}
            showPlayButton={false}
            showNav={false} />
          <div> 
        
          </div>
        </div>
        <div className="md:w-2/4 px-2 ">
          <h3 className="text-green-500 font-semibold text-[18px] ">
            {ProductsDetails?.category.name}
          </h3>
          <p className="font-bold text-[20px]">{ProductsDetails?.title}</p>
          <p className="font-light text-[20px]">
            {ProductsDetails?.description}
          </p>
          <div className="flex justify-between items-center mb-7">
            <span className="font-semibold">
              {ProductsDetails?.price}{" "}
              <span className="font-bold text-green-500">EGP</span>
            </span>
            <span className="font-semibold">
              {ProductsDetails?.ratingsAverage}{" "}
              <i className="fas fa-star text-yellow-400"></i>
            </span>
          </div>
          <button
           disabled={isAddToCard}
            onClick={() => addProductToCard(ProductsDetails?.id)}
            className="btn text-white font-semibold w-full rounded-md "
          >
                      {isAddToCard?<i className="fa-solid fa-spin fa-spinner"></i>:' Add to card'}
                      </button>
        </div>
      </div>
      <h2 className="font-semibold text-[20px]">Popular Product</h2>
      <div className=" mb-3">
        <swiper-container
          className="swiper "
          autoplay-delay="2000"
          space-between="4" 
          slides-per-view={3}
        >
          {relatedProduct.map((product) => {
            return (
              <swiper-slide key={product.id} >
                <div className="  ">
                  <div className="product shadow-lg  mt-2 ">
                    <Link
                      to={`/productDetails/${product.id}/${product.category.name}`}
                    >
                      <div className="sm:h-[240px] h-[150px]">
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
            );
          })}
        </swiper-container>
      </div>
    </>
  );
}
