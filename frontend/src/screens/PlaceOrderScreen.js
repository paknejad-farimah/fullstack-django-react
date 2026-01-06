import React from "react";
import Message from "../componnent/Message";
import Loader from "../componnent/Loader";
import CheckoutSteps from "../componnent/CheckoutSteps";
import { Row, Col, ListGroup, Button, Image, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../redux/features/Order/orderThunk";
import { calculatePrices } from "../utils/utils";
import { reset } from "../redux/features/User/userSlice";

function PlaceOrderScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calculatePrices(cart);
  const placeOrder = () => {
    dispatch(createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      }))
  }
  const { loading, error, success, order } = useSelector(state => state.orderCreate
  );
  const { userInfo } = useSelector((state) => state.userLogin);
  React.useEffect(() => {
    if (!userInfo.access) {
      navigate('/login?redirect=/placeorder');
    }
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch(reset());
    }
  }, [success, navigate, userInfo,order]);
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />

      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item className="mb-3">
              <h2>shipping</h2>
              {cart.shippingAddress.address ? (
                <p>
                  <strong>Shipping: </strong>
                  {cart.shippingAddress.country}, {cart.shippingAddress.city},{" "}
                  {cart.shippingAddress.address}/ Postal Code:{" "}
                  {cart.shippingAddress.postalCode}
                </p>
              ) : (
                <Message
                  variant="warning"
                  text="shipping address not entered!"
                />
              )}
            </ListGroup.Item>
            <ListGroup.Item className="mb-3">
              <h2>payment method</h2>
              {cart.paymentMethod ? (
                <p>
                  <strong>Method: </strong>
                  {cart.paymentMethod}
                </p>
              ) : (
                <Message variant="warning" text="payment method not selected" />
              )}
            </ListGroup.Item>
            <ListGroup.Item className="border-bottom">
              <h2>order items</h2>
              {cart.cartItems.length === 0 ? (
                <Message variant="warning" text="your cart is empty!" />
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index} className="my-3 text-center">
                      <Row>
                        <Col md={2}>
                          <Image src={item.image} alt={item.name} fluid />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price} ={" "}
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>order summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>shipping:</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {loading && (
                <ListGroup.Item>
                  <Loader />
                </ListGroup.Item>
              )}
              {error && (
                <ListGroup.Item>
                  <Message variant="danger" text={error} />
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn btn-block w-100"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrder}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrderScreen;
