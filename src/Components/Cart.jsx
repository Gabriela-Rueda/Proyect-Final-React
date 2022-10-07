import React, { useEffect } from 'react';
import { Button, ListGroup, ListGroupItem, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteProductThunk, getCartThunk, purchaseCartThunk } from '../store/slices/cart.slice';
import {deleteProduct} from '../store/slices/cart.slice';

const Cart = ({handleClose, show}) => {

    const dispatch= useDispatch();
    const cartList= useSelector((state)=> state.cart)
    const navigate= useNavigate();

    useEffect(()=>{
      dispatch(getCartThunk());
  }, [])

     const compra=()=>{
      dispatch(purchaseCartThunk())
     }

    
    return (
        <div>
    <>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>This is your Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup>
            {cartList.map((product)=>(
              <div key={product.id}>
                <p>{product.brand}</p>
                <h5 onClick={()=>navigate(`/products/${product.id}`)}>{product.title}</h5>
              <div>

                {product.productsInCart.quantity}
               </div>
              Total: <b>${product.price}</b>

              <Button variant="primary" onClick={()=>dispatch(deleteProductThunk(product.id))}>Delete</Button>{' '}

              </div>
            ))}
          </ListGroup>
          <Button variant="primary" onClick={compra}>Buy</Button>{' '}

        </Offcanvas.Body>
      </Offcanvas>
    </>
        </div>
    );
};

export default Cart;