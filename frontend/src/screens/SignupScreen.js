import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link,useLocation,useNavigate } from 'react-router-dom'
import {Row,Col,Button,Form } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import {signup} from '../actions/userActions'

function SignupScreen() {
    let navigate=useNavigate()  
    const { search } = useLocation()

    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [message,setMessage]=useState('')
    
    const dispatch=useDispatch()
    const redirect=search ?  search.split("=")[1]:'/'
    const submitHandler =(e)=>{
        e.preventDefault()
        if(password !=confirmPassword){
            setMessage("Passwords do not match")
        }else{
        dispatch(signup(name,email,password))
        }
    }
    const userSignup=useSelector(state=>state.userSignup)
    const {error,loading,userInfo}=userSignup
    useEffect(()=>{
      if(userInfo){
        navigate(redirect)
      }
    },[userInfo,redirect])
  return (
    <FormContainer>
       <h1>Sign Up</h1>
       {message&&  <Message variant='danger'>{error}</Message>}
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader/>}
          <Form onSubmit={submitHandler}>
          
          <Form.Group controlId='name'>
            <Form.Label> Name  </Form.Label>
            <Form.Control required  type='name' placeholder='Enter Name' value={name} onChange={(e) =>setName(e.target.value)}>
               
            </Form.Control>
        </Form.Group>
          
          <Form.Group controlId='email'>
            <Form.Label> Email Address </Form.Label>
            <Form.Control required type='email' placeholder='Enter Email' value={email} onChange={(e) =>setEmail(e.target.value)}>
               
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
            <Form.Label> Password </Form.Label>
            <Form.Control required  type='password' placeholder='Password' value={password} onChange={(e) =>setPassword(e.target.value)}>
               
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='passwordConfirm'>
            <Form.Label> Password </Form.Label>
            <Form.Control required type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) =>setConfirmPassword(e.target.value)}>
               
            </Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
            Sign Up
        </Button>

    </Form> 
          
     <Row  className='py-3'>
        <Col>
          Have an Account ?
          <Link to={redirect ?`/login?redirect=${redirect}`:'/login'}>Sign In</Link>
        </Col>

      </Row>
    </FormContainer>
  )
}

export default SignupScreen
