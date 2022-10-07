import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { addProductsThunk } from '../store/slices/cart.slice';

const ProductDetails = () => {

    const [cant, setCant]= useState(0)
    const {id}= useParams();
    const productsList=useSelector(state=> state.products)
    const dispatch= useDispatch();

    const productDetail= productsList.find(product=> product.id === Number(id))
    const productRelated= productsList.filter(product =>
         product.category.id===productDetail.category.id)

      useEffect(()=>{
      setCant(0);
        },[id])

       const  addCart = () =>{
       const productCart={
        id:parseInt(id),
        quantity:cant
       }
      dispatch(addProductsThunk(productCart))
      console.log(productCart)
       }


    return (
        <div>
            <h1>products details</h1>
            <h2>{productDetail?.title}</h2>
            <img className='img-fluid' src={productDetail?.productImgs[0]} alt="" width={"150px"} />
            <p>{productDetail?.description}</p>
           
            Price :<b>{productDetail?.price}</b>
<div>
            <Button className='me-7, mt-3' onClick={()=>setCant(cant-1)}>-</Button>
            {cant}<Button className='ms-7, mt-3' onClick={()=> setCant(cant+1)}>+</Button>
</div>
<Button className='mt-3 mb-4' onClick={addCart}>Add to Cart</Button>

<div className='div-details'>
            <ul className='list-details'>
                {productRelated.map(product=>(
                    <li key={product.id}>
                        <Link to={`/products/${product.id}`}><img src={product.productImgs[1]} alt="" width={'120px'} /></Link>
                        <br />
                        <Link to={`/products/${product.id}`}>{product.title}</Link>
                        </li>
                ))}
            </ul>

</div>

        </div>
    );
};

export default ProductDetails;