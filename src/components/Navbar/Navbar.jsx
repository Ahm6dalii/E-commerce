import React, { useContext, useEffect, useState } from "react";
import style from "./Navbar.module.css";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";
import { userContex } from "../../context/userContext";
import { CardContext } from "../../context/CardContext";
import { Link } from "react-router-dom";
import { WishListContext } from "../../context/WishLIstContext";
import { jwtDecode } from "jwt-decode";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Category", href: "/categories" },
  { name: "Brands", href: "/brands" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  let { userInfo, setUserInfo } = useContext(userContex);
  let { wishNumber, setWishNumber, isLoadingWish, getWishCard } =
    useContext(WishListContext);
  let { userLogin, setUserLogin } = useContext(userContex);
  let { cardNuber, setCardNumber, getCard, isCardLoading, setCardLoading } =
    useContext(CardContext);
  const [isDarkMode, setIsDarkMode] = useState(false);
  let navigate = useNavigate();

  function signOut() {
    navigate("/login");
    localStorage.removeItem("token");
    localStorage.removeItem("cardNumber");
    setCardNumber(0);
    setWishNumber(0);
    setUserLogin(null);
  }

  useEffect(() => {
    if (localStorage.getItem("mode") == "dark") {
      setIsDarkMode(true);
    }
  }, []);
  useEffect(() => {
    const rootElement = document.getElementById("root");
    if (rootElement) {
      if (isDarkMode) {
        rootElement.classList.add("dark");
        localStorage.setItem("mode", "dark");
      } else {
        rootElement.classList.remove("dark");
        localStorage.setItem("mode", "light");
      }
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <Disclosure
      as="nav"
      className="bg-gray-100 fixed top-0 start-0 end-0 z-50 dark:bg-slate-700 dark:text-slate-100"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                {/* Mobile menu button*/}
                {userLogin && (
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon
                        className="block h-6 w-6 "
                        aria-hidden="true"
                      />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                )}
              </div>
              <div
                className={`flex ${
                  !userLogin ? "ml-12" : " "
                }ml-12 md:ml-0  items-center justify-center sm:items-stretch sm:justify-start`}
              >
                <div className="flex flex-shrink-0 items-center">
                  <svg
                    data-name="Layer 1"
                    className=" w-8"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.53 5 5 3H1.25a1 1 0 0 0 0 2h2.22L6.7 18H20v-2H8.26l-.33-1.34L21 12.17V5ZM19 10.52 7.45 12.71 6 7h13ZM7 19a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 7 19Zm12 0a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 19 19Z"
                      fill="#0e9f6e"
                      className="fill-000000"
                    ></path>
                  </svg>
                  <h1 className="font-semibold text-[20px] text-slate-800 dark:text-slate-100">
                    FreshCard
                  </h1>
                </div>
                {userLogin && (
                  <div className="hidden sm:ml-6 md:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={({ isActive }) => {
                            return `dark:text-slate-100  p-1 mr-1 px-1 relative text-gray-600 hover:text-gray-900  before:absolute before:bottom-[-2px] before:left-0 before:h-[2px] before:bg-green-500 hover:font-semibold before:w-0 hover:before:w-full before:transition-all before:duration-500 ${
                              isActive
                                ? "before:w-full font-semibold text-gray-900 "
                                : ""
                            }`;
                          }}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {!userLogin ? (
                  <>
                      <label
                        htmlFor="toggleBtn"
                        type="button"
                        class="mr-2 border hover:ring-2  hover:ring-green-200 cursor-pointer text-gray-500 relative dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-full text-sm p-1.5"
                      >
                           <input
                      checked={isDarkMode}
                      onClick={toggleDarkMode}
                      type="checkbox"
                      id="toggleBtn"
                      className="absolute hidden "
                    />
                    {isDarkMode&&<svg
                          class="w-5 h-5  "
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                        </svg>}
                        
                      {!isDarkMode&&<svg
                          id="theme-toggle-light-icon"
                          class="w-5 h-5  "
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                          ></path>
                        </svg>}  
                      </label>
                    <NavLink
                      to={"login"}
                      className={classNames(
                        " text-gray-600  hover:bg-gray-300 hover:text-gray-800 dark:text-slate-100",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                      aria-current={"page"}
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to={"register"}
                      className={classNames(
                        " text-gray-600  hover:bg-gray-300 hover:text-gray-800 dark:text-slate-100",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                      aria-current={"page"}
                    >
                      Register
                    </NavLink>
                  </>
                ) : null}

                {/* Profile dropdown */}
                {/* cart and wish icons */}
                {userLogin && (
                  <>
                    <div className="relative rounded-full hover:ring-2  hover:ring-green-200 bg-green-500 px-2 py-1 mr-3 text-gray-100 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                      <Link to="/cart">
                        {" "}
                        <i className="fa-solid fa-cart-shopping text-sm text-white"></i>
                      </Link>
                      <p className="flex justify-center items-center absolute top-0 end-0 w-4 h-4 translate-x-1/2 -translate-y-1/2 bg-[#84CC16] text-white px-[1px] rounded-full">
                        {isCardLoading ? (
                          <i className="fa-solid fa-spin fa-spinner"></i>
                        ) : (
                          cardNuber
                        )}
                      </p>
                    </div>
                    <div className="relative hover:ring-2  hover:ring-green-200 rounded-full bg-green-500 px-2 py-1 mr-3 text-gray-100 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                      <Link to="/wish-list">
                        {" "}
                        <i className="fa-solid fa-heart text-sm text-white"></i>
                      </Link>

                      <p className="flex  justify-center items-center absolute top-0 end-0 w-4 h-4 translate-x-1/2 -translate-y-1/2 bg-[#84CC16] text-white px-[1px] rounded-full">
                        {isLoadingWish ? (
                          <i className="fa-solid fa-spin fa-spinner"></i>
                        ) : (
                          wishNumber
                        )}
                      </p>
                    </div>
                 
                {/*Dark mode toggle button  */}
                      <label
                        htmlFor="toggleBtn"
                        type="button"
                        class="border hover:ring-2  hover:ring-green-200 cursor-pointer text-gray-500 relative dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-full text-sm p-1.5"
                      >
                           <input
                      checked={isDarkMode}
                      onClick={toggleDarkMode}
                      type="checkbox"
                      id="toggleBtn"
                      className="absolute hidden "
                    />
                    {isDarkMode&&<svg
                          class="w-5 h-5  "
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                        </svg>}
                        
                      {!isDarkMode&&<svg
                          id="theme-toggle-light-icon"
                          class="w-5 h-5 "
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                          ></path>
                        </svg>}  
                      </label>

               
                    <Menu as="div" className="relative ml-3 ">
                      <div>
                        <Menu.Button className="hover:ring-2  hover:ring-green-200 relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-600">
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
                        <Menu.Items className="dark:text-slate-100 dark:bg-slate-800 absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <p
                                href="#"
                                className="dark:text-slate-100 dark:focus:bg-slate-600 dark:hover:bg-slate-600 block px-4 py-2 text-sm text-gray-700"
                              >
                                {userInfo.name}
                              </p>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/allorders"
                                className="dark:text-slate-100 dark:focus:bg-slate-600 dark:hover:bg-slate-600 block px-4 py-2 text-sm text-gray-700"

                              >
                                Orders
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/cart"                         
                                className="dark:text-slate-100 dark:hover:bg-slate-600 dark:focus:bg-slate-600 flex justify-between px-4 py-2 text-sm text-gray-700"


                              >
                                <span> Cart</span>
                                <span className="dark:text-slate-100  border rounded-full px-1 border-green-500">
                                  {isCardLoading ? (
                                    <i className="fa-solid fa-spin fa-spinner"></i>
                                  ) : (
                                    cardNuber
                                  )}
                                </span>
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/wish-list"
                                className="dark:text-slate-100 dark:hover:bg-slate-600 dark:focus:bg-slate-600 flex justify-between px-4 py-2 text-sm text-gray-700"

                              >
                                <span> Wish List</span>
                                <span className="border rounded-full px-1 border-green-500">
                                  {isCardLoading ? (
                                    <i className="fa-solid fa-spin fa-spinner"></i>
                                  ) : (
                                    wishNumber
                                  )}
                                </span>
                              </Link>
                            )}
                          </Menu.Item>

                          <Menu.Item>
                            {({ active }) => (
                              <span
                                href="#"
                                onClick={signOut}
                                className="dark:text-slate-100 dark:focus:bg-slate-600 dark:hover:bg-slate-600 block px-4 py-2 text-sm text-gray-700"
                              >
                                Sign out
                              </span>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </>
                )}
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
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-400 hover:bg-gray-700  hover:text-white",
                    "block rounded-md px-3 py-2 dark:hover:bg-gray-500 text-base font-medium dark:text-slate-100 "
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
