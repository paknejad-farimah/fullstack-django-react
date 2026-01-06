import React from 'react';
import CheckoutSteps from '../componnent/CheckoutSteps';
import FormContainer from '../componnent/FormContainer';
import {Form,Button} from 'react-bootstrap'
import { UseSelector,useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../redux/features/cart/cartSlice';

function PaymentScreens() {

    const dispatch=useDispatch()
    const navigate=useNavigate()

    const {shippingAddress,paymentMethod} = useSelector(state=>state.cart)
    const [paymentMethodChoice,setPaymentMethodChoice]=React.useState(paymentMethod)

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethodChoice))
        navigate('/placeorder')
    }

    React.useEffect(()=>{
        if(!shippingAddress.address){
            navigate('/shipping')
        }
    },[shippingAddress,navigate])
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1 className='mt-4'>payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
            <Form.Label>select Method</Form.Label>
            <Form.Check
                name='paymentMethod'
                id='idpay'
                label='idpay'
                type='radio'
                onChange={(e)=>setPaymentMethodChoice(e.target.id)}
                className='py-4'
                checked={paymentMethodChoice==='idpay'}
            ></Form.Check>
            <Form.Check
                name='paymentMethod'
                id='zibal'
                label='Zibal'
                type='radio'
                onChange={(e)=>setPaymentMethodChoice(e.target.id)}
                className='py-4'
                checked={paymentMethodChoice==='zibal'}
            ></Form.Check>
        </Form.Group>
        <Button
        type='submit'
        className='col-4 mt-4'
        disabled={paymentMethodChoice===''}
        >continue</Button>

      </Form>
    </FormContainer>
  );
}

export default PaymentScreens;
