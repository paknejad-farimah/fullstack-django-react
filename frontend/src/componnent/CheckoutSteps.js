import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function CheckoutSteps({step1,step2,step3,step4}) {
  return (
    <div>
      <Nav className='justify-content-center py-3 mb-3'>
        <Nav.Item>
            {step1 ?(
                <LinkContainer to={{pathname:'/login',search:'?redirect=/shipping'}}>
                <Nav.Link>login</Nav.Link>
                </LinkContainer>
            ):(
                <Nav.Link> disabledlogin</Nav.Link>
            )}
        </Nav.Item>
        <Nav.Item>
            {step2?(
                <LinkContainer to='/shipping'>
                    <Nav.Link>shipping</Nav.Link>
                </LinkContainer>
            ):(
                <Nav.Link disabled>shipping</Nav.Link>
            
            )}
        </Nav.Item>
        <Nav.Item>
            {step3?(
                <LinkContainer to='/payment'>
                    <Nav.Link>payment</Nav.Link>
                </LinkContainer>
            ):(
                <Nav.Link disabled>payment</Nav.Link>
            
            )}
        </Nav.Item>
        <Nav.Item>
          {step4?(
                <LinkContainer to='/placeorder'>
                    <Nav.Link>placeorder</Nav.Link>
                </LinkContainer>
            ):(
                <Nav.Link disabled>placeorder</Nav.Link>
            
            )}
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default CheckoutSteps;
