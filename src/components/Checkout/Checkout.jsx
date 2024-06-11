import React, { useContext, useEffect, useState } from 'react'
import style from './Checkout.module.css'
import { useFormik } from 'formik'
import { CardContext } from '../../context/CardContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import { HelmetProvider,Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function Checkout() {
 let[cartID,setCartId]= useState(0)
 let[orderPay,setOrderPay]= useState('')
 let[isCashLoading,setCashLoading]=useState(true)
 let[isOnlineLoading,setOnlineLoading]= useState(true)
 let[isNoErro,setNoErro]= useState(true)

let navigate=useNavigate();
  let{getCard,setCardNumber}=useContext(CardContext)
  useEffect(()=>{
    getCardItems()
 },[])

 async function getCardItems(){
   let respose= await getCard();
   setCartId(respose?.data?.data._id)
  }

  // console.log(formik.errors)
 async function makeCashOrder(value){
  setCashLoading(false)
 const opt={
  url:`https://ecommerce.routemisr.com/api/v1/orders/${cartID}`,
  method:'POST',
  headers:{ token:localStorage.getItem('token')},
  data:{value}
 }

 try{
  let res = await axios.request(opt)
  setCardNumber(0)
  navigate('/allorders');
 }catch({response}){
   toast.error('fail to make order card is empty')
 }
 setCashLoading(true)

 }

 async function makeOnlineOrder(value){
  setOnlineLoading(false)
 const opt={
  url:`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=https://e-commerce-ashen-theta.vercel.app`,
  method:'POST',
  headers:{ token:localStorage.getItem('token')},
  data:{value}
 }
 try{
   toast.loading('redirect to payment page')
   let {data} = await axios.request(opt)
 
    if(data.status=='success')
      {
        window.location.href=data.session.url;
     
      }

   setCardNumber(0)
 }catch({response}){
  toast.error('fail to make order card is empty')
}
setOnlineLoading(true)

 }
 function handleRegister(value){
  console.log(!formik.errors.city, 'sssss',value)
  console.log(formik)

 }
  const formik=useFormik({
    initialValues:{
      shippingAddress:{
        details: "",
        phone: "",
        city: ""
        },
        },
        validate,
        onSubmit:(value)=>{
      if(orderPay=='cash'){
        makeCashOrder(value)
      } else {
        makeOnlineOrder(value)
      }
    }
    
  })
  function  validate(){
if(formik.values.shippingAddress.phone && formik.values.shippingAddress.city)
  {
    setNoErro(false)
    }else{
      setNoErro(true)
    }
  }
    const[count,setcount]=useState(0)
    useEffect(()=>{

    },[])
  return (
    <>
    <HelmetProvider>
      <Helmet>
    <title>FreshCart/Checkout</title>
  </Helmet>
    </HelmetProvider>
    <section className='container mt-3  px-2'>
      <h2 className='my-2 font-semibold text-[20px]'>Shippping Address</h2>
      <form className='flex flex-col gap-4' onSubmit={formik.handleSubmit}>
      <input type="text" required value={formik.values.shippingAddress.city} name='shippingAddress.city'  onBlur={formik.handleBlur} onChange={formik.handleChange} className='rounded-lg py-1  '  placeholder='City..' />

      <input type="tel" required value={formik.values.shippingAddress.phone} name='shippingAddress.phone' onBlur={formik.handleBlur} onChange={formik.handleChange} className='rounded-lg py-1'  placeholder='Phone..' />
 
      <textarea className='rounded-lg py-1' value={formik.values.shippingAddress.details} name="shippingAddress.details" onBlur={formik.handleBlur}   onChange={formik.handleChange} id="" rows={3} cols={4} placeholder='details'></textarea>
      <div>
        <button onClick={()=>setOrderPay("cash")} disabled={isNoErro}  type='submit' className={`${isNoErro?'bg-slate-500 dark:bg-slate-500 ':'bg-blue-500'} text-white transition-all duration-300 hover:text-blue-500 hover:bg-white shadow py-1 px-2 rounded-lg`}>{!isCashLoading? <i className="fas fa-spinner fa-spin-pulse"></i>:"Cash Order" }</button>
        <button onClick={()=>setOrderPay("online")} disabled={isNoErro} type='submit' className={`${isNoErro?'bg-slate-500 dark:bg-slate-500':'bg-green-500'} bg-green-500 text-white transition-all duration-300 hover:text-green-500 hover:bg-white m-2 shadow py-1 px-2 rounded-lg `}>{!isOnlineLoading? <i className="fas fa-spinner fa-spin-pulse"></i>:"Online Paymenrt" }</button>
      </div>
      </form>


    </section>
    </>
  )
}
