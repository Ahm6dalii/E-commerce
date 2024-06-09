import axios from "axios";
import { createContext, useEffect, useState } from "react";


export let CardContext = createContext();

export default function CardContexProvider(props){

    let [cardNuber,setCardNumber]=useState(0)
    let [isCardLoading,setCardLoading]=useState(false)
    let [CardData,setCardData]=useState(false)
    let headers={
        token:localStorage.getItem('token')
    }

    function removeCard(productItem){
        return   axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productItem}`,
          {
            headers
        }).then((respose)=>respose)
        .catch((error)=>error)
    }
    function removeAllCard(productItem){
        return   axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
          {
            headers
        }).then((respose)=>respose)
        .catch((error)=>error)
    }
    function updateQantity(productItem,count){
        return   axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productItem}`,{
            count:count
        },
          {
            headers
        }).then((respose)=>respose)
        .catch((error)=>error)
    }
    function getCard(){
        return   axios.get('https://ecommerce.routemisr.com/api/v1/cart',
          {
            headers
        }).then((respose)=>respose)
        .catch((error)=>error)
    }

   function addToCard(productId){
        return   axios.post('https://ecommerce.routemisr.com/api/v1/cart',{
            productId:productId
        },{
            headers
        }).then((respose)=>respose)
        .catch((error)=>error)
    }

   function addToCard(productId){
        return   axios.post('https://ecommerce.routemisr.com/api/v1/cart',{
            productId:productId
        },{
            headers
        }).then((respose)=>respose)
        .catch((error)=>error)
    }


    async function getCardDetals(){
        setCardLoading(true)
      await axios.get('https://ecommerce.routemisr.com/api/v1/cart',
          {
            headers
        }).then(({data})=>{
            setCardNumber(data.numOfCartItems)
            CardData()
           })
            .catch((error)=>error)
        setCardLoading(false)
            }

    useEffect(()=>{
        getCardDetals()

    },[])
    return <CardContext.Provider value={{setCardLoading,addToCard, getCard,removeCard,cardNuber,setCardNumber,updateQantity,removeAllCard,isCardLoading,setCardLoading}}>
        {props.children}
       
    </CardContext.Provider>
}