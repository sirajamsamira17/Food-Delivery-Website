import React,{useEffect}from 'react'
import{useParams,useNavigate,useLocation} from  'react-router-dom'
import {Link} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import {Row,Col,Image,ListGroup,Button,Card,Form} from 'react-bootstrap'
import {addToCart,removeFromCart } from '../actions/cartActions'
import Message from '../components/Message'


function CartScreen() {
  let navigate=useNavigate()   
  const {_id } = useParams();
  const { search } = useLocation();
  const productId =_id;
  const qty = search ? Number(search.split("=")[1]):1
  
  // console.log('qty:',qty)

   const dispatch = useDispatch()
   const cart=useSelector(state =>state.cart)
   const{cartItems}=cart
  useEffect(() => {
   if (productId){
       dispatch(addToCart(productId, qty))
     }
  
   }, [dispatch, productId, qty])
   
 const removeFromCartHandler=(_id)=>{
 // console.log('remove:',_id)
 dispatch(removeFromCart(_id))
 }
const checkoutHandler=()=>{
  navigate('/login?redirect=shipping')
}
   
     
     
   
  return (
  
   <Row>
  <Col md={8}>
    <h1>Cart</h1>
    {cartItems.length ===0 ?(
  <Message variant ='info'>
    Your Cart is Empty <Link to='/'>Go Back</Link>
  </Message>

    ):(
      <ListGroup variant='flush'>
           {cartItems.map(item =>(
            <ListGroup.Item key={item.product}>
                 <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded/>
                  </Col>
                  <Col md={3}>
                   <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>
                   ${item.price}
                  </Col>
                  <Col md={3}>
                     
                   <Form.Control as ="select" 
                   value={item.qty} 
                   onChange={(e)=>dispatch(addToCart(item.product,Number(e.target.value)))}>
                    {
                  [...Array(item.countINStock).keys()].map((x)=>(
                    <option key={x+1} value={x+1}>
                      {x+1}
                    </option>
                  ))
                  
                }  
                   </Form.Control>
                  </Col>
                <Col md={1}>
                    <Button type='button' variant='light' onClick={()=>removeFromCartHandler(item.product)}>
                    <i className='fas fa-trash'></i>

                    </Button>
                  </Col>
                 </Row>
            </ListGroup.Item>
           ))}
      </ListGroup>
    )
  }
  </Col>
   <Col md={4}>
    <Card>
      <ListGroup variant='flush'>
        <ListGroup.Item>
          <h2>Subtotal({cartItems.reduce((acc,item)=>acc +item.qty,0)})items</h2>
          ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
   
        
        </ListGroup.Item>

      </ListGroup>
      <ListGroup.Item>
        <Button type='button' className='btn-block'disabled={cartItems.length===0} onClick={checkoutHandler}>
          Proceed To Checkout
        </Button>
      </ListGroup.Item>
    </Card>
   </Col>
</Row>

  )
}

export default CartScreen
