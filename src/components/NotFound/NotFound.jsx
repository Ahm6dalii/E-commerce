import React, { useEffect, useState } from 'react'
import style from './NotFound.module.css'
import notFound from '../../assets/images/error.svg'
export default function NotFound() {
    const[count,setcount]=useState(0)
    useEffect(()=>{

    },[])
  return (
    <>
  <img src={notFound } alt=""  className='mx-auto pb-4'/>

    </>
  )
}
