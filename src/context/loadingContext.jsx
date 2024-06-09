import { createContext, useEffect, useState } from "react";



export let LoadingContext=createContext(false);

export default function LoadingContextProvider(props){
const[isLoading,setLoading]=useState(false);
   
    return <LoadingContext.Provider value={{isLoading,setLoading}} >
        {
            props.children
        }
    </LoadingContext.Provider>
}