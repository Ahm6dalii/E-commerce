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
    <div className='px-2 sm:px-10 md:px-15 lg-px20 mx-auto pb-[160px] py-5 text-slate-900  dark:bg-gray-900 dark:text-slate-100'>
    <Outlet/>
    </div>
    <Footer/>
  </>)
}
