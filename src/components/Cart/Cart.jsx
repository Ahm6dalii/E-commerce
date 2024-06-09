import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { CardContext } from '../../context/CardContext'
import { Link } from 'react-router-dom';
import CartTable from './../CartTable/CartTable';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { HelmetProvider,Helmet } from 'react-helmet-async';

export default function Cart() {
  let{getCard,removeCard,cardNuber,setCardNumber,updateQantity,removeAllCard}=useContext(CardContext)
   let [cartDetails,setCartDetails]= useState(null);
   let[isloading,setIsLoading]=useState(true);
   let[isloadingClear,setIsLoadingClear]=useState(true)


    useEffect(()=>{
       getCardItems()
    },[])

    async function getCardItems(){
      setIsLoading(true)
      let respose= await getCard();
      setIsLoading(false)
      setCartDetails(respose.data)
      console.log(respose.data)
    }

    async function updateQantityItems(productId,count){
        if(count<1)
            {
                removeCardItems(productId)
              
            }
      let respose= await updateQantity(productId,count);
      setCartDetails(respose.data)
      localStorage.setItem('cardNumber',respose.data?.numOfCartItems)

    }

    
    async function removeAllCardItems(productId){
        setIsLoadingClear(false)
      let respose= await removeAllCard(productId);
      setIsLoadingClear(true)
      setCardNumber(0)
      localStorage.removeItem('cardNumber')
      setCartDetails(null )
    }


  return (
    <>
    <HelmetProvider>
      <Helmet>
    <title>FreshCart/Cart</title>
  </Helmet>
    </HelmetProvider>
   {isloading ? <LoadingScreen/> : <section className=' p-3'>
    <div className='flex items-center'>
    <h2 className='text-2xl font-semibold ml-2 '>
        <span>Shop Cart</span>
        <i className='fas fa-shopping-cart'></i>
      </h2>

      {cardNuber == '0'||cartDetails ==null ?"" : 
      <div className='w-fit ms-auto flex items-center'>
        <button disabled={!isloadingClear} onClick={()=>removeAllCardItems()} className='fa-lg bg-red-500 text-white transition-all duration-300 hover:text-red-500 hover:bg-white ml-auto m-2 block shadow p-3 rounded-xl '>{!isloadingClear ? <i className="fas fa-spinner fa-spin-pulse"></i> :<span><i className='fas fa-trash-alt  '></i>  Clear Cart </span> } </button>
        <div className='text-[20px] font-bold py-[7px] px-3 bg-green-500 text-white flex justify-center items-center rounded'>{  cartDetails.numOfCartItems } </div>
      </div>
         }

    </div>
      {(cardNuber == '0'|| cartDetails==null)? <div className='flex flex-col justify-center items-center py-16'>
        <h2 className='text-lg'>There is no product in cart yet !</h2>
        <Link to='/' className='bg-green-300 hover:bg-green-500 transition-all mt-3 p-3  text-white font-semibold rounded-full'>ADD YOUR FIRST PRODUCT TO CART</Link>
      </div>: <CartTable updateQantityItems={updateQantityItems}  setCartDetails={setCartDetails} cartDetails={cartDetails}/>}
      <div className='ms-auto w-fit  rounded-xl'>{cardNuber == '0'|| cartDetails == null ?"":<Link to='/checkout' > <button  className='fa-lg bg-green-500 w-full text-white transition-all duration-300 hover:text-green-500 hover:bg-white ml-auto m-2 block shadow p-3 rounded-xl '>{!isloadingClear ? <i className="fas fa-spinner fa-spin-pulse"></i> :<span><i className="fa-regular fa-credit-card"></i>  Make Order </span> } </button></Link>}   </div>

    </section>} 
    


    </>
  )
}
