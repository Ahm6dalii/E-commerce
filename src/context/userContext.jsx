import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate, useNavigate } from 'react-router-dom';
export let userContex=createContext(null);

export default function UserContextProvider(props){
const[userLogin,setUserLogin]=useState(null);
const[userID,setUserID]=useState(null);
const[userInfo,setUserInfo]=useState(null);
const[isLoading,setLoading]=useState(false);

useEffect(()=>{
    try {
        let user=jwtDecode(localStorage.getItem('token'))
        setUserID(user.id)
        setUserInfo(user)
        setUserLogin(true)
    } catch (error) {
        setUserLogin(false) 
        localStorage.removeItem('token')
    }

        
    window.addEventListener('storage',()=>{
        try {
      jwtDecode(localStorage.getItem('token'))
  } catch (error) {
      localStorage.removeItem('token')

  }  
})

    },[])
return <userContex.Provider value={{userLogin,setUserInfo,setUserLogin,isLoading,userID,userInfo}} >
        {
            props.children
        }
    </userContex.Provider>
}