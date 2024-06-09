import React, { useContext, useEffect, useState } from "react";
import style from "./Products.module.css";
import axios from "axios";
import { CardContext } from "../../context/CardContext";
import toast from "react-hot-toast";
import useRecentProduct from "../../Hooks/useRecentProduct";
import { Link } from "react-router-dom";
import { WishListContext } from "../../context/WishLIstContext";
import RecentProductCard from './../RecentProductCard/RecentProductCard';
import LoadingScreen from './../LoadingScreen/LoadingScreen';
import { HelmetProvider,Helmet } from 'react-helmet-async';

export default function Products() {

  
  let {addToCard}= useContext(CardContext);
  let{setCardNumber}=useContext(CardContext)
  const [isAddToCard, setAddToCard] = useState(false);
  let{addToWishCard,setWishNumber, getWishCard,deleteFromWishList}=useContext(WishListContext);
  let[isloading,setIsLoading]=useState(false)
  let{data,isError,error,isLoading,isFetching}=useRecentProduct();
  let[wishIDs,setWishIDs] =useState([])
  let[productSearched,setProductSearched] =useState(null)

  let headers={
    token:localStorage.getItem('token')
}
function SearchINProduct(){
  let ProductCopy=[...data?.data.data]
  let val=document.getElementById('ser').value;
  let newProducts=[]
  for(let i=0;i<ProductCopy.length;i++)
    {
      if(ProductCopy[i].title.toLowerCase().includes(val.toLowerCase()))
        {
          newProducts.push(ProductCopy[i])
        }else{
          setProductSearched(null)
        }
    }
    setProductSearched(newProducts)
}

    useEffect(()=>{
      gitAllWishList()
      console.log(data)
    },[])


  async function gitAllWishList(){
    setIsLoading(true)
    let{data}=await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',{headers})
    setIsLoading(false)
    let wish=data?.data?.map((item)=>item.id)
    setWishIDs(wish)
  }
  

  return ( <>
    <HelmetProvider>
      <Helmet>
    <title>FreshCart/Product</title>
  </Helmet>
  </HelmetProvider>
  <div className='px-2'>
        <input type="search" name=""  className='w-full mt-3 focus:border-none focus:ring-2 focus:shadow-green-500  focus:outline-none focus:ring-green-500 py-2 border-gray-500 rounded-full placeholder:text-xl ' placeholder="Search........." onInput={SearchINProduct} id="ser" />
      </div>   {isLoading?<LoadingScreen/>: <div className="flex flex-wrap  items-center  ">
     {(productSearched == '') && <div className='text-xl my-3 text-center bg-green-400 w-full py-2 rounded-full text-[#eee] '>No product found 🤔</div>}

      {productSearched?productSearched.map((product) => {
       return <RecentProductCard key={product.id} product={product} wishIDs={wishIDs}/>
      }):data?.data.data.map((product) => {
       return <RecentProductCard key={product.id} product={product} wishIDs={wishIDs}/>
      })}
    </div>}
    
     
    </>
  );
}
