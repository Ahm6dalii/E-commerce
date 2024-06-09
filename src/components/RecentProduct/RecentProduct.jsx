import React, { useContext, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import LoadingScreen from './../LoadingScreen/LoadingScreen';
import { Link } from 'react-router-dom';
import useRecentProduct from '../../Hooks/useRecentProduct';
import  { CardContext } from '../../context/CardContext';
import RecentProductCard from '../RecentProductCard/RecentProductCard';
import axios from 'axios';
import { WishListContext } from '../../context/WishLIstContext';
import { jwtDecode } from 'jwt-decode';
import { userContex } from '../../context/userContext';



export default function RecentProduct() {
  let{setCardNumber,isCardLoading,setCardLoading}=useContext(CardContext)
  let{data,isError,error,isLoading,isFetching}=useRecentProduct();
  const [isAddToCard, setAddToCard] = useState(false);
  let[productSearched,setProductSearched] =useState(null)
  let[productData,setProductData] =useState(null)
  let {userInfo,setUserInfo}=useContext(userContex)
  let{addToWishCard,setLoadingWish,setWishNumber, getWishCard,deleteFromWishList}=useContext(WishListContext);


  let headers={
    token:localStorage.getItem('token')
}
let[wishIDs,setWishIDs] =useState([])

  async function gitAllWishList(){
    setLoadingWish(true)
    let{data}=await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',{headers})
    let wish=data?.data?.map((item)=>item.id)
    setLoadingWish(false)
    setWishNumber(data.count)
    localStorage.setItem('wishNumber',data.count)
    setWishIDs(wish)
  }

  async function getCardInfo(){
    setCardLoading(true)
   await  axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
      headers
  }).then(({data})=>{
    console.log(data)
    setCardNumber(data.numOfCartItems)
  })
  .catch((err)=>setCardNumber(0)
)
  // console.log('ddddd',data)
    setCardLoading(false)

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

  async function getProductData(){
    let {data}= await axios.get("https://ecommerce.routemisr.com/api/v1/products")
    setProductData(data.data)
  }

  useEffect(()=>{
    getCardInfo()
    gitAllWishList()
    // getWishCard()
    getProductData()
    try {
      let user=jwtDecode(localStorage.getItem('token'))
        setUserInfo(user) 
  } catch (error) {

  }
    
  }
,[])
  
if(isLoading)
  {
    return <LoadingScreen/>;
  }
    return (
      <>
      <div className='px-2'>
        <input type="search" name=""  className='w-full mt-3 focus:border-none focus:ring-2 focus:shadow-green-500  focus:outline-none focus:ring-green-500 py-2 border-gray-500 rounded-full placeholder:text-xl ' placeholder="Search........." onInput={SearchINProduct} id="ser" />
      </div>
        <div className="flex flex-wrap pt-2 items-center  ">       
            {productSearched?productSearched.map((product) => {
           return <RecentProductCard key={product.id} product={product} wishIDs={wishIDs}/>
      }):productData?.map((product) => {
             return <RecentProductCard key={product.id} product={product} wishIDs={wishIDs}/>
            })}
          </div>
       
      </>
    );
}
