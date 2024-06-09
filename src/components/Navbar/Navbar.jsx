import React, { useContext, useEffect, useState } from 'react'
import style from './Navbar.module.css'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink, useNavigate } from 'react-router-dom';
import { userContex } from '../../context/userContext'
import { CardContext } from '../../context/CardContext'
import { Link } from 'react-router-dom';
import { WishListContext } from '../../context/WishLIstContext'
import { jwtDecode } from 'jwt-decode'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products'  },
  { name: 'Category', href: '/categories' },
  { name: 'Brands', href: '/brands' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Navbar() {
  let {userInfo,setUserInfo}=useContext(userContex)
  let {wishNumber,setWishNumber,isLoadingWish,getWishCard}=useContext(WishListContext)
  let {userLogin,setUserLogin} =useContext(userContex);
  let{cardNuber,setCardNumber,getCard,isCardLoading,setCardLoading}=useContext(CardContext)

  let navigate =useNavigate()
  let[cardInfo,setCardInfo]= useState(null);

  async function getCardInfo(){

    setCardLoading(true)
    let res = await getCard();
    setCardLoading(false)
    setCardInfo(res)

  }


    let [conut,setCount]=useState(0);
 
    useEffect(()=>{
     
    try {
      // getCardInfo()
      // getWishCard()
    } catch (error) {
      
    }
    
    },[])


    function signOut(){
    navigate('/login');
    localStorage.removeItem('token');
    localStorage.removeItem('cardNumber');
    setCardNumber(0)
    setWishNumber(0)
    setUserLogin(null)
    }

  return (
    <Disclosure as="nav" className="bg-gray-100 fixed top-0 start-0 end-0 z-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                {/* Mobile menu button*/}
              {userLogin &&<Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6 " aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>}  
              </div>
              <div className={`flex ${ !userLogin?"ml-12":" "}ml-12 md:ml-0  items-center justify-center sm:items-stretch sm:justify-start`}>
                <div className="flex flex-shrink-0 items-center">
              <svg data-name="Layer 1" className=' w-8' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5.53 5 5 3H1.25a1 1 0 0 0 0 2h2.22L6.7 18H20v-2H8.26l-.33-1.34L21 12.17V5ZM19 10.52 7.45 12.71 6 7h13ZM7 19a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 7 19Zm12 0a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 19 19Z" fill="#0e9f6e" className="fill-000000"></path></svg>   
              <h1 className='font-semibold text-[20px]' >
                            FreshCard
              </h1>
                </div>
            {userLogin &&<div className="hidden sm:ml-6 md:block">
                  <div className="flex space-x-4">
                  
                  {navigation.map((item) => (
                      <NavLink 
                        key={item.name}
                       to={item.href}
                     
                        className={  ({isActive})=>{
                          return`p-1 mr-1 px-1 relative text-gray-600 hover:text-gray-900  before:absolute before:bottom-[-2px] before:left-0 before:h-[2px] before:bg-green-500 hover:font-semibold before:w-0 hover:before:w-full before:transition-all before:duration-500 ${isActive?'before:w-full font-semibold text-gray-900 ':''}`
                         }}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </NavLink >
                    ))}
                
                  </div>
                </div> }     
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

             {!userLogin? <>
              <NavLink
                       to={'login'}
                        className={classNames(    ' text-gray-600  hover:bg-gray-300 hover:text-gray-800',
                        'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={ 'page' }
                      >
                        Login
                </NavLink>
              <NavLink
                       to={'register'}
                        className={classNames(
                           ' text-gray-600  hover:bg-gray-300 hover:text-gray-800',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={'page'}
                      >
                        Register
                </NavLink>
               
             </>:null} 

                

                {/* Profile dropdown */}
               {userLogin && <>
                <div className='relative rounded-full bg-green-500 px-2 py-1 mr-3 text-gray-100 hover:text-white focus:outline-none focus:ring-2 focus:ring-white'>
                <Link to="/cart"> <i className='fa-solid fa-cart-shopping text-sm text-white'></i></Link> 
                  <p className='flex justify-center items-center absolute top-0 end-0 w-4 h-4 translate-x-1/2 -translate-y-1/2 bg-[#84CC16] text-white px-[1px] rounded-full'>{isCardLoading?<i className="fa-solid fa-spin fa-spinner"></i>:cardNuber}</p>
                </div>
                <div className='relative rounded-full bg-green-500 px-2 py-1 mr-3 text-gray-100 hover:text-white focus:outline-none focus:ring-2 focus:ring-white'>
                <Link to="/wish-list">  <i className='fa-solid fa-heart text-sm text-white'></i></Link> 
                 
                  <p className='flex justify-center items-center absolute top-0 end-0 w-4 h-4 translate-x-1/2 -translate-y-1/2 bg-[#84CC16] text-white px-[1px] rounded-full'>{isLoadingWish?<i className="fa-solid fa-spin fa-spinner"></i>:wishNumber}</p>
                </div>

                <button
                  type="button"
                  className="relative rounded-full bg-green-500 p-1 text-gray-100 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-600">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                           {userInfo.name}
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/allorders"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >                         
                         Orders
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/cart"
                            className={classNames(active ? 'bg-gray-100' : '', 'flex justify-between px-4 py-2 text-sm text-gray-700')}
                          >
                            <span> Cart</span>
                            <span className='border rounded-full px-1 border-green-500'>{isCardLoading?<i className="fa-solid fa-spin fa-spinner"></i>:cardNuber}</span>
                          
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/wish-list"
                            className={classNames(active ? 'bg-gray-100' : '', 'flex justify-between px-4 py-2 text-sm text-gray-700')}
                          >
                             <span>  Wish List</span>
                             <span className='border rounded-full px-1 border-green-500'>{isCardLoading?<i className="fa-solid fa-spin fa-spinner"></i>:wishNumber}</span>
                          
                          </Link>
                        )}
                      </Menu.Item>
                  
                      <Menu.Item>
                        {({ active }) => (
                          <span
                            href="#"
                            onClick={signOut}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}
                          >
                            Sign out
                          </span>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
               </>} 
               
              </div>
            </div>
          </div>

        <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={NavLink}
                  to={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel> 
        </>
      )}
    </Disclosure>
  )
}

