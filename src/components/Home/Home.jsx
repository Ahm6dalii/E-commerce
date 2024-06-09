import React, { useContext, useEffect, useState } from "react";
import style from "./Home.module.css";
import RecentProduct from "../RecentProduct/RecentProduct";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import HomeSlider from './../HomeSlider/HomeSlider';
import CategorySlide from "../CategorySlide/CategorySlide";
import { LoadingContext } from "../../context/loadingContext";
import useRecentProduct from "../../Hooks/useRecentProduct";
import { WishListContext } from './../../context/WishLIstContext';
import { CardContext } from "../../context/CardContext";

export default function Home() {
  let [conut, setCount] = useState(0);
  let {wishNumber,setWishNumber,isLoadingWish,getWishCard}=useContext(WishListContext)
  let{cardNuber,setCardNumber,getCard,isCardLoading,setCardLoading}=useContext(CardContext)

  useEffect(() => {

  }, []);
  
  let{isLoading}=useRecentProduct();


  if(isLoading)
    {
      return <LoadingScreen/>;
    }
  return <>    
    <HomeSlider/>
  <CategorySlide/>
  <RecentProduct />
  </>;
}
