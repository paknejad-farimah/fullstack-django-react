import React, {useState,useEffect} from 'react';
import {Row,Col} from 'react-bootstrap';
import Product from '../componnent/Product';
import { fetchProducts } from '../redux/features/Product/productThunk';
import {useDispatch ,useSelector} from 'react-redux';
import Loader from '../componnent/Loader';
import Message from '../componnent/Message';

function HomeScreens() {
  const dispatch = useDispatch()
const {loading, error ,products } = useSelector(state=>state.listProduct)

  useEffect(()=>{
    dispatch(fetchProducts())
  },[])
  return (
    <div>
      <h1 className='py-4'>latest products</h1>
      {loading ? <Loader/> : error ? <Message variant= 'danger' text={error}/>: (
        <Row>
        {products.map(product=>(
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product}/>
            <hr />
            </Col>
        ))}
      </Row>

        
        )}
      
    </div>
  );
}

export default HomeScreens;
