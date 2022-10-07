import React, { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {

    const dispatch = useDispatch();
    const purchasesList= useSelector((state)=>state.purchases);
    const navigate= useNavigate();

    useEffect(()=>{
        dispatch(getPurchasesThunk());
    }, [])

    
    return (
        <div>
            <h1>My Purchases</h1>
    <div>

    
    <ListGroup>
      {purchasesList.map((purchase)=>(
        <>
        <ListGroup.Item key={purchase.id}>{purchase.createdAt}</ListGroup.Item>
   
           <ListGroup.Item>
           {purchase.cart.products.map((product)=>(
                    <div onClick={()=> navigate(`/products/${product.id}`)}>
                      {product.title}
                    </div>
     ))}
           </ListGroup.Item>
     </>   
     ))}
    </ListGroup>
    </div>
        </div>
    );
};

export default Purchases;