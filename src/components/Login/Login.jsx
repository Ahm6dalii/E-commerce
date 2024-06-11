import React, { useContext, useEffect, useState } from 'react'
import style from './Login.module.css'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { userContex } from '../../context/userContext'
import toast, { Toaster } from 'react-hot-toast';

export default function Login() {
  let navigate =useNavigate()
  let {setUserLogin} =useContext(userContex);
  const[isLoading,setLoading]=useState(false)
  let[isNoErro,setNoErro]= useState(true)

  async function handleRegister(value){
    setLoading(true);
    await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',value)
    .then(function(data){
      localStorage.setItem('token',data.data.token)
      console.log('token',data.data.token)
      setUserLogin(data.data.token);
      toast.success('login successfully !')
      setLoading(false)
      navigate('/')
    })
    .catch(function({response}){
      setLoading(false)
      formik.errors.password=response.data.message;

    }
  );
  }

let validationSchema=Yup.object().shape({ 
  email:Yup.string().matches(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,'Enter valid email') .required('email is required'),
  password:Yup.string().min(6,'Minimun length 6 letter').required('password is required'),
})

  const formik = useFormik({
    initialValues:{
      "email":"",
      "password":"",
    },
    onSubmit:handleRegister,
    validationSchema,
    validate
    
  });

  function  validate(){
    if(!formik.errors.email&& !formik.errors.password)
      {
        setNoErro(false)
        }else{
          setNoErro(true)
        }
      }
 useEffect(()=>{},[])
  
  return (
    <>
     <div className='flex flex-col items-center   '>
    <h2 className='flex items-center gap-2 text-green-600 font-bold mt-4 text-[24px] sm:text-[30px]'>
<svg data-name="Livello 1" width={"30px"} fill={'#046c4e'} id="Livello_1" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><style dangerouslySetInnerHTML={{__html: ".cls-1{fill:none;stroke:#fff;stroke-linecap:round;stroke-miterlimit:10;stroke-width:2px;}" }} /></defs><title /><path d="M0,32A32,32,0,1,0,32,0,32,32,0,0,0,0,32Z" /><g id="User"><path className="cls-1" d="M46,42.18v5.91a0.91,0.91,0,0,1-.9.91H18a0.91,0.91,0,0,1-.9-0.91V42.18c0-4.77,6.47-8.64,14.45-8.64S46,37.41,46,42.18Z" /><ellipse className="cls-1" cx="31.55" cy="21.18" rx="6.42" ry="6.18" /></g></svg>
      Login Form
      </h2>
<form className="w-[90%]  lg:w-[50%] pt-4 " onSubmit={formik.handleSubmit}>

  <div className="relative z-0 w-full mb-2 group">
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email"  value={formik.values.email}  name="email" id="floating_email" className="block py-2 sm:py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
  </div>
  {formik.errors.email && formik.touched.email &&<p className='p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'>{formik.errors.email}</p> }

  <div className="relative z-0 w-full mb-2 group">
      <input onChange={formik.handleChange} onBlur={formik.handleBlur}  value={formik.values.password} type="password"  name="password" id="floating_password" className="block py-2 sm:py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
  </div>
  {formik.errors.password && formik.touched.password &&<p className='p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'>{formik.errors.password}</p> }

    <div className='flex flex-col text-sm'>
      <p className='font-light mt-2'>didn't have account yet ? <span className='font-semibold'><Link to={'/register'} > Register now </Link></span> </p>
     <p className='font-light my-2 '><span className='text-green-500'><Link to={'/reset-password'} > Reset Password</Link></span> </p>
    </div>
  
  <button type="submit" disabled={isNoErro} className={`${isNoErro?'bg-slate-500 dark:bg-slate-500':'bg-green-700 dark:bg-blue-600'} text-white ms-auto block  hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 sm:py-2.5 text-center  dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>{isLoading? <i className='fas fa-spin fa-spinner'></i>:'Submit'}</button>
</form>
  </div>
    </>
  )
}
