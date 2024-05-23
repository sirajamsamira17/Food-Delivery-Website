import React,{useState,useEffect} from 'react'
import{useParams,useNavigate,useLocation} from  'react-router-dom'
import {Button,Form} from 'react-bootstrap'

function SearchBox() {
     
    const [keyword,setKeyword]=useState('')
    let navigate=useNavigate()
    const location=useLocation()

    const submitHandler=(e)=>{
        e.preventDefault()
        if(keyword){
             navigate(`/?keyword=${keyword}`)
        }else{
            navigate(navigate(location.pathname))
        }

    }
  return (
    <Form onSubmit={submitHandler} inline='true'>
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                className='mr-sm-2 ml-md-5'
            ></Form.Control>

            <Button
                type='submit'
                //variant='outline-success'
                className='p-2'
            >
                Submit
            </Button>
        </Form>
    
  )
}

export default SearchBox