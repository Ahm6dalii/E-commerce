import React, { useEffect, useState } from 'react'
import style from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'
export default function Register() {
  let navigate =useNavigate()

  const[apiError,setApiError]=useState('');
  const[isLoading,setLoading]=useState(false);

  async function handleRegister(value){
    setApiError("");
    setLoading(true);
    await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',value)
    .then(function(data){
      setLoading(false)
      navigate('/login')
      toast.success('User created successfully !')
    })
    .catch(function(err){
      if(err.response.data.message=='fail')
        {
          setApiError("phone not valid must be egypt number ")

        }else{
          setApiError(err.response.data.message)

        }
      setLoading(false)
    }
  );
  }

let validationSchema=Yup.object().shape({
  name:Yup.string().min(3,'Name must be greater than 2 character').max(10,'Name must be less than 10 character').required('Name is required'),
  phone:Yup.string().matches(/^^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{5}$/,'Enter a valid phone number').required('Phone is required'),
  email:Yup.string().matches(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,'Enter a valid email') .required('Email is required'),
  password:Yup.string().min(6,'Minimun length 6 letter').required('password is required'),
  rePassword:Yup.string().oneOf([Yup.ref('password')],'password must be matched').required('password is required'),
})

  const formik = useFormik({
    initialValues:{
      "name":"",
      "phone":"",
      "email":"",
      "password":"",
      "rePassword":""
    },
    onSubmit:handleRegister,
    validationSchema
    
  });
 
   
  return (
    <>
     <div className='flex flex-col items-center  '>
    <h2 className=' flex items-center gap-2 text-green-600 font-bold sm:mt-4 text-[24px] sm:text-[30px]'>
<svg  width={"30px"} fill={'#046c4e'} id="레이어_1" style={{enableBackground: 'new 0 0 40 40'}} version="1.1" viewBox="0 0 40 40" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><path d="M37.1,5.22h-2v-2c0-0.5-0.4-0.9-0.9-0.9c-0.5,0-0.9,0.4-0.9,0.9v2h-2c-0.5,0-0.9,0.4-0.9,0.9c0,0.5,0.4,0.9,0.9,0.9h2v2  c0,0.5,0.4,0.9,0.9,0.9c0.5,0,0.9-0.4,0.9-0.9V7h2C37.6,7,38,6.6,38,6.1s-0.4-0.9-0.9-0.9l0,0V5.22z" /><path d="M28.76,20c2.92-2.28,3.44-6.5,1.16-9.42c-1.24-1.6-3.14-2.54-5.16-2.58c-1.64,0-3.22,0.62-4.42,1.74  C18.22,5.8,13.32,4.33,9.38,6.45S3.97,13.47,6.09,17.4c0.65,1.2,1.59,2.23,2.74,2.97C4.87,21.53,2,24.85,2,28.77v8  c0,0.5,0.4,0.9,0.9,0.9c0,0,0,0,0,0h20.88c0.5,0,0.9-0.4,0.9-0.9l0,0v-1.62h8.54c0.5,0,0.9-0.4,0.9-0.9v0V27.3  C34.08,23.97,31.92,21.04,28.76,20z M24.76,9.75c2.71-0.05,4.94,2.09,5,4.8c0.05,2.71-2.09,4.94-4.8,5  c-1.79,0.04-3.46-0.91-4.35-2.46l0.05-0.14c0.08-0.17,0.15-0.34,0.22-0.51s0.13-0.4,0.19-0.6s0.05-0.16,0.07-0.25  c0.17-0.64,0.26-1.29,0.26-1.95c0-0.43,0-0.84-0.06-1.26c-0.04-0.26-0.09-0.52-0.16-0.77c0,0,0-0.08,0-0.11  c0.89-1.1,2.22-1.74,3.63-1.75H24.76z M19.41,21c-0.52-0.24-1.05-0.44-1.6-0.59c0.68-0.45,1.29-1,1.8-1.64  c0.39,0.51,0.86,0.95,1.39,1.32c-0.54,0.24-1.04,0.56-1.49,0.93L19.41,21z M7,13.64c-0.01-3.47,2.81-6.29,6.28-6.3  c2.69,0,5.09,1.7,5.96,4.25c0.24,0.66,0.36,1.35,0.36,2.05c-0.01,0.68-0.12,1.36-0.34,2c-0.79,2.34-3.06,4.28-5.62,4.28  c0,0-0.74,0-0.74,0C9.59,19.71,7,16.96,7,13.64z M22.88,35.91H3.8c0,0,0-7.14,0-7.14c0-1.46,0.54-2.88,1.46-4.01  c0.97-1.19,2.31-2.05,3.77-2.53c0.89-0.29,1.83-0.41,2.76-0.45c0.96-0.04,1.95-0.1,2.91-0.02c0.5,0.04,1,0.14,1.49,0.24  c0.52,0.11,1.03,0.24,1.53,0.39c0.25,0.07,0.49,0.16,0.74,0.24c0.72,0.25,1.36,0.62,1.97,1.08c0.38,0.29,0.66,0.63,0.99,0.96  c0.27,0.27,0.48,0.67,0.64,1.01c0.26,0.53,0.38,1.11,0.51,1.68c0.22,0.99,0.32,1.99,0.32,3.01c0,0.68,0,1.36,0,2.04  c0,1.15,0,2.29,0,3.44c0,0.03,0,0.07,0,0.1L22.88,35.91z M32.32,33.35h-7.64v-4.58c0,0,0-0.06,0-0.09s0-0.18,0-0.28  c-0.1-1.57-0.61-3.09-1.47-4.4c-0.05-0.07-0.11-0.14-0.16-0.22c-0.18-0.24-0.37-0.48-0.57-0.7l-0.05-0.06  c-0.35-0.38-0.75-0.73-1.18-1.02c0.79-0.47,1.69-0.7,2.61-0.65h2.22c3.36-0.07,6.15,2.59,6.24,5.95V33.35z" /></svg>
      Registration Form
      </h2>
<form className="w-[90%]  lg:w-[50%] sm:pt-4 " onSubmit={formik.handleSubmit}>

 {apiError && <p className='p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'>{apiError}</p> }

    <div className="relative z-0 w-full  sm:mb-2 group">
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} name="name" type="text"   id="floating_first_name" className="block py-2 sm:py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
        <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
    </div>
      {formik.errors.name && formik.touched.name && <p className='p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'>{formik.errors.name}</p> }
    <div className="relative z-0 w-full  sm:mb-2 group">
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel"  value={formik.values.phone} name="phone" id="floating_phone" className="block py-2 sm:py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
        <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number </label>
  </div>
  {formik.errors.phone && formik.touched.phone && <p className='p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'>{formik.errors.phone}</p> } 

  
  <div className="relative z-0 w-full  sm:mb-2 group">
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email"  value={formik.values.email}  name="email" id="floating_email" className="block py-2 sm:py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
  </div>
  {formik.errors.email && formik.touched.email &&<p className='p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'>{formik.errors.email}</p> }

  <div className="relative z-0 w-full  sm:mb-2 group">
      <input onChange={formik.handleChange} onBlur={formik.handleBlur}  value={formik.values.password} type="password"  name="password" id="floating_password" className="block py-2 sm:py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
  </div>
  {formik.errors.password && formik.touched.password &&<p className='p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'>{formik.errors.password}</p> }

  <div className="relative z-0 w-full  sm:mb-2 group">
      <input onChange={formik.handleChange} onBlur={formik.handleBlur}  value={formik.values.rePassword} type="Password"  name="rePassword" id="floating_repeat_password" className="block py-2 sm:py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
  </div>
  {formik.errors.rePassword && formik.touched.rePassword &&<p className='p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'>{formik.errors.rePassword}</p>} 


  <button type="submit" className="text-white ms-auto block bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 sm:py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isLoading? <i className='fas fa-spin fa-spinner'></i>:'Submit'}</button>
</form>
  </div>
    </>
  )
}
