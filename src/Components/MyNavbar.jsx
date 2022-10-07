import React, { useState } from 'react';
import { Nav, Navbar,Container } from 'react-bootstrap';
import { Link, useNavigate} from 'react-router-dom';
import Cart from './Cart';

const MyNavbar = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
  const navigate= useNavigate();
  const logOut= () =>{
    localStorage.setItem("token", " ");
    navigate("/login")

  }

    return (
      <>
      
      <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to='/'>e-commerce</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to='/login'>Login</Nav.Link>
          <Nav.Link as={Link} to='/purchases'>Purchases</Nav.Link>
          <Nav.Link onClick={handleShow}>Cart</Nav.Link>
          <Nav.Link onClick={logOut} >Log out</Nav.Link>
          </Nav>
        </Container>
       </Navbar>

      <Cart handleClose={handleClose} show={show}  />
    </>
    );
};

export default MyNavbar;