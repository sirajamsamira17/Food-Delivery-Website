import axios from 'axios'
import{PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS,PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST,PRODUCT_DELETE_SUCCESS,PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,PRODUCT_CREATE_SUCCESS,PRODUCT_CREATE_FAIL,PRODUCT_CREATE_RESET,
    PRODUCT_UPDATE_REQUEST,PRODUCT_UPDATE_SUCCESS,PRODUCT_UPDATE_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,PRODUCT_CREATE_REVIEW_SUCCESS,PRODUCT_CREATE_REVIEW_FAIL,
}  from '../constants/productConstants'


export const listProducts =  (keyword='') =>dispatch=>{
  dispatch({ type: PRODUCT_LIST_REQUEST })
  fetch(`/api/products${keyword}`)
           .then((data) =>{
            return data.json()
           })
           .then(actualdata=>{
            dispatch({
                    type: PRODUCT_LIST_SUCCESS,
                    payload:actualdata
                        })
           })
           
           .catch((error)=>{
            dispatch({
                           type: PRODUCT_LIST_FAIL,
                       payload: error.response && error.response.data.detail
                            ? error.response.data.detail
                                 : error.message,
                        })
           })
    
        }


export const listProductDetails =  (_id) =>dispatch=>{
            dispatch({ type: PRODUCT_DETAILS_REQUEST })
            fetch(`/api/products/${_id}`)
                     .then((data) =>{
                      return data.json()
                     })
                     .then(actualdata=>{
                      dispatch({
                              type: PRODUCT_DETAILS_SUCCESS,
                              payload:actualdata
                                  })
                     })
                     
                     .catch((error)=>{
                      dispatch({
                                     type: PRODUCT_DETAILS_FAIL,
                                 payload: error.response && error.response.data.detail
                                      ? error.response.data.detail
                                           : error.message,
                                  })
                     })
              
                  }

export const deleteProduct = (id) => async (dispatch, getState) => {
                    try {
                        dispatch({
                            type: PRODUCT_DELETE_REQUEST
                        })
                
                        const {
                            userLogin: { userInfo },
                        } = getState()
                
                        const config = {
                            headers: {
                                'Content-type': 'application/json',
                                Authorization: `Bearer ${userInfo.token}`
                            }
                        }
                
                        const { data } = await axios.delete(
                            `/api/products/delete/${id}/`,
                            config
                        )
                
                        dispatch({
                            type: PRODUCT_DELETE_SUCCESS,
                        })
                
                
                    } catch (error) {
                        dispatch({
                            type: PRODUCT_DELETE_FAIL,
                            payload: error.response && error.response.data.detail
                                ? error.response.data.detail
                                : error.message,
                        })
                    }
                }
export const createProduct = () => async (dispatch, getState) => {
                    try {
                        dispatch({
                            type: PRODUCT_CREATE_REQUEST
                        })
                
                        const {
                            userLogin: { userInfo },
                        } = getState()
                
                        const config = {
                            headers: {
                                'Content-type': 'application/json',
                                Authorization: `Bearer ${userInfo.token}`
                            }
                        }
                
                        const { data } = await axios.post(
                            `/api/products/create/`,
                            {},
                            config
                        )
                        dispatch({
                            type: PRODUCT_CREATE_SUCCESS,
                            payload: data,
                        })
                
                
                    } catch (error) {
                        dispatch({
                            type: PRODUCT_CREATE_FAIL,
                            payload: error.response && error.response.data.detail
                                ? error.response.data.detail
                                : error.message,
                        })
                    }
                }
export const updateProduct = (product) => async (dispatch, getState) => {
                    try {
                        dispatch({
                            type: PRODUCT_UPDATE_REQUEST
                        })
                
                        const {
                            userLogin: { userInfo },
                        } = getState()
                
                        const config = {
                            headers: {
                                'Content-type': 'application/json',
                                Authorization: `Bearer ${userInfo.token}`
                            }
                        }
                
                        const { data } = await axios.put(
                            `/api/products/update/${product._id}/`,
                            product,
                            config
                        )
                        dispatch({
                            type: PRODUCT_UPDATE_SUCCESS,
                            payload: data,
                        })
                
                
                        dispatch({
                            type: PRODUCT_DETAILS_SUCCESS,
                            payload: data
                        })
                
                
                    } catch (error) {
                        dispatch({
                            type: PRODUCT_UPDATE_FAIL,
                            payload: error.response && error.response.data.detail
                                ? error.response.data.detail
                                : error.message,
                        })
                    }
                } 

export const createProductReview = (productId, review) => async (dispatch, getState) => {
                    try {
                        dispatch({
                            type: PRODUCT_CREATE_REVIEW_REQUEST
                        })
                
                        const {
                            userLogin: { userInfo },
                        } = getState()
                
                        const config = {
                            headers: {
                                'Content-type': 'application/json',
                                Authorization: `Bearer ${userInfo.token}`
                            }
                        }
                
                        const { data } = await axios.post(
                            `/api/products/${productId}/reviews/`,
                            review,
                            config
                        )
                        dispatch({
                            type: PRODUCT_CREATE_REVIEW_SUCCESS,
                            payload: data,
                        })
                
                
                
                    } catch (error) {
                        dispatch({
                            type: PRODUCT_CREATE_REVIEW_FAIL,
                            payload: error.response && error.response.data.detail
                                ? error.response.data.detail
                                : error.message,
                        })
                    }
                }
              
                                              
          