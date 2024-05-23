import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link,useLocation,useNavigate } from 'react-router-dom'
import {Row,Col,Button,Form } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import {login} from '../actions/userActions'

function LoginScreen() {
    let navigate=useNavigate()  
    const { search } = useLocation()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const dispatch=useDispatch()
    const redirect=search ?  search.split("=")[1]:'/'
    const submitHandler =(e)=>{
        e.preventDefault()
         console.log("submitted")
        dispatch(login(email,password))

    }
    const userLogin=useSelector(state=>state.userLogin)
    const {error,loading,userInfo}=userLogin
    useEffect(()=>{
      if(userInfo){
        navigate(redirect)
      }
    },[userInfo,redirect])
  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader/>}
      <Form onSubmit={submitHandler}>
        
        <Form.Group controlId='email'>
            <Form.Label> Email Address </Form.Label>
            <Form.Control  type='email' placeholder='Enter Email' value={email} onChange={(e) =>setEmail(e.target.value)}>
               
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
            <Form.Label> Password </Form.Label>
            <Form.Control  type='password' placeholder='Enter Password' value={password} onChange={(e) =>setPassword(e.target.value)}>
               
            </Form.Control>
        </Form.Group>
        
        <Button type='submit' variant='primary'>
            Sign In
        </Button>


      </Form>
      <Row  className='py-3'>
        <Col>
          New Customer ?
          <Link to={redirect ?`/signup?redirect=${redirect}`:'/signup'}>Signup</Link>
        </Col>

      </Row>
    </FormContainer>
  )
}

export default LoginScreen


