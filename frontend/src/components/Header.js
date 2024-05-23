import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {Navbar,Nav,Container, NavDropdown} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import  { logout}from '../actions/userActions'
function Header() {
  const userLogin=useSelector(state=>state.userLogin)
  const{userInfo}=userLogin
  const logoutHandler =(e)=>{
   
    dispatch(logout())

}
const dispatch=useDispatch()

  return (
    <header>
      <Navbar bg="dark" variant='dark'expand="lg"collapseOnSelect >
  <Container>
    <LinkContainer to="/">
    <Navbar.Brand >Swiggy</Navbar.Brand>
    </LinkContainer>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <SearchBox/> 
      <Nav className="me-auto">
      <LinkContainer to="/cart">
        <Nav.Link>Cart</Nav.Link>
        </LinkContainer>

      {userInfo ?(
        <NavDropdown title={userInfo.name} id='username'>
          <LinkContainer to='/profile'>
            <NavDropdown.Item> Profile </NavDropdown.Item>
          </LinkContainer>
          <NavDropdown.Item onClick={logoutHandler}> LogOut</NavDropdown.Item>

        </NavDropdown>
      ):(
        <LinkContainer to="/login">
        <Nav.Link >Login</Nav.Link>
        </LinkContainer>
      )}
       
       {userInfo && userInfo.isAdmin &&(
        <NavDropdown title='Admin' id='adminmenu'>
        <LinkContainer to='/admin/userlist'>
          <NavDropdown.Item> Users </NavDropdown.Item>
        </LinkContainer>

        <LinkContainer to='/admin/productlist'>
          <NavDropdown.Item> Items </NavDropdown.Item>
        </LinkContainer>
        
        <LinkContainer to='/admin/orderlist'>
          <NavDropdown.Item> Orders </NavDropdown.Item>
        </LinkContainer>
           </NavDropdown>
        )}
       
       
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
    </header>
  )
}

export default Header