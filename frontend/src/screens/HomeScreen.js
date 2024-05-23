import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import{useNavigate,useLocation} from  'react-router-dom'
import {Row,Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listProducts } from '../actions/productActions'
//import products from '../products'
function HomeScreen() {
  //const[products,setProducts]=useState([])
  const location=useLocation() 
  let navigate=useNavigate() 
  const dispatch=useDispatch()
  const productList= useSelector(state=>state.productList)
  const{error,loading,products}=productList

  let keyword=location.search
  console.log(keyword)
   useEffect(()=>{
        dispatch(listProducts(keyword))
         
      
      },[dispatch,keyword])



  return(
    <div>
      <h1>Menu</h1>
      {loading ? <Loader/>
          :error ? <Message variant='danger'>{error}</Message>
            :
            <Row>
            {
            products.map(product =>(
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product}/>
              </Col>
            ))}
       </Row>
      }
   </div>
  ) 
  }

export default HomeScreen