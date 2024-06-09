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
       
      {productSearched?productSearched.map((product) => {
       return <RecentProductCard key={product.id} product={product} wishIDs={wishIDs}/>
      }):data?.data.data.map((product) => {
       return <RecentProductCard key={product.id} product={product} wishIDs={wishIDs}/>
      })}
    </div>}
    
     
    </>
  );
}
{/* <div className=" sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 p-2" key={product.id}>
<div className="product shadow-lg">
<Link to={`/productDetails/${product.id}/${product.category?.name}`}>
   <img src={product.imageCover} className="w-full " alt={product.title} />
  <div className="p-2">
  <h3 className="text-green-500 font-light">{product.category?.name}</h3>
   <p className="font-semibold sm:text-[12px ] line-clamp-1">{product.title}</p>  
   <div className="flex justify-between items-center mb-7">
     <span className="font-semibold">{product.price} <span className="font-bold text-green-500">EGP</span></span>
     <span className="font-semibold">{product.ratingsAverage} <i className="fas fa-star text-yellow-400"></i></span>
   </div>     
  </div>
  </Link>
  <button disabled={isAddToCard} onClick={()=> addProductToCard(product.id)} className="btn text-white font-semibold w-full rounded-md absolute bottom-[-100px] transition-all duration-500">  {isAddToCard?<i class="fa-solid fa-spin fa-spinner"></i>:' Add to card'}</button>  

 </div>
 </div> */}