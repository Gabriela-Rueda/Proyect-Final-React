import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { InputGroup } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
const Home = () => {

     const productsList=useSelector((state) => state.products);
      const navigate= useNavigate();
      const [categories, setCategories]=useState([]);
      const [productsFiltered, setProductsFiltered]= useState([]);
      const [nameProduct, setNameProduct]= useState("");

      useEffect(()=>{
        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
        .then(res=> setCategories(res.data.data.categories))
      },[])

      useEffect(()=>{
        setProductsFiltered(productsList);
      },[productsList])

     const filterCategory = (categoryId)=>{
       const productFiltered = productsList.filter(products =>
        products.category.id===categoryId)
        setProductsFiltered(productFiltered)
     }

     const searchProduct= () =>{
         const nameFiltered= productsList.filter(products=>
          products.title.toLowerCase().includes(nameProduct.toLowerCase())
          )

          setProductsFiltered(nameFiltered)
     }


    return (
        <div>
            <h1>Home</h1>
 <Row>
  <Col lg={2}>
              <h3>Category</h3>
              <ListGroup>
              {
                  categories.map(category =>(
                  <ListGroup.Item key={category.id} onClick={()=>filterCategory(category.id)}>

                  {category.name}
                  </ListGroup.Item>
                  ))
                }
                </ListGroup>
              
  </Col>

  <Col>

<InputGroup className="mb-3">
        <Form.Control
          placeholder="Search Product"
          value={nameProduct}
          onChange={e=>setNameProduct(e.target.value)}
        />
        <Button variant="outline-secondary" onClick={searchProduct} >
          Search
        </Button>
      </InputGroup>

      <Row xs={1} md={3} className="g-2">
{productsFiltered.map((product) => (
<Col key={product.id}>
<Card onClick= {()=>navigate(`/products/${product.id}`)} style={{height: "70%"}}>
<Card.Img variant="top" src={product.productImgs[1]} alt="" width={"100px"} />
<Card.Body>
 <Card.Title>{product.title}</Card.Title>
  <Card.Text>
    Price <b>{product.price}</b>
  </Card.Text>
</Card.Body>
</Card>
</Col>
))}

</Row>
  </Col>
 </Row>

        </div>
    );
};

export default Home;