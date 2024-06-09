import React, { useEffect, useState } from 'react'
import style from './Layout.module.css'
import Navbar from './../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './../Footer/Footer'

export default function Layout() {
    let [conut,setCount]=useState(0);
    useEffect(()=>{

    },[])
  return (
    <>
    <Navbar/>
    <div className='container mx-auto pb-[160px] py-5  '>
    <Outlet/>
    </div>
    <Footer/>
  </>)
}
