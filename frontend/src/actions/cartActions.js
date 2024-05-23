import{CART_ADD_ITEM,CART_REMOVE_ITEM,CART_SAVE_SHIPPING_ADDRESS,CART_SAVE_PAYMENT_METHOD

 }  from '../constants/cartConstants'


export const addToCart =  (_id,qty) =>(dispatch,getState)=>{
     fetch(`/api/products/${_id}`)
              .then((data) =>{
             return data.json()
            })
           .then(actualdata=>{
               dispatch({
                       type: CART_ADD_ITEM,
                       payload:{
                         product:actualdata._id,
                        name:actualdata.name,
                         image:actualdata.image,
                         price:actualdata.price,
                        countINStock:actualdata.countINStock,
                        qty
                        
                      }
                     } )

                      
                    })
            
                
                                     
                             
  localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
                  }
export const removeFromCart=(_id)=>(dispatch,getState)=>{
  dispatch({
    type:CART_REMOVE_ITEM,
    payload:_id
  })
  localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))

}

export const saveShippingAddress=(data)=>(dispatch)=>{
  dispatch({
    type:CART_SAVE_SHIPPING_ADDRESS,
    payload:data
  })
  localStorage.setItem("shippingAddress",JSON.stringify(data))

}

export const savePaymentMethod=(data)=>(dispatch)=>{
  dispatch({
    type:CART_SAVE_PAYMENT_METHOD,
    payload:data
  })
  localStorage.setItem("paymentMethod",JSON.stringify(data))

}