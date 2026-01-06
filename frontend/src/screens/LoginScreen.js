import React from "react";
import FormContainer from "../componnent/FormContainer";
import Loader from "../componnent/Loader";
import Message from "../componnent/Message";
import { Form, Button, FormGroup, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/features/User/userThunk";

function LoginScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const redirect = urlParams.get("redirect") || "/register";
  const token = urlParams.get('token') ? urlParams.get('token'): ''

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [activationMsg,setActivationMsg] = React.useState('')
  const { userInfo, loading, error } = useSelector((state) => state.userLogin);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  React.useEffect(() => {
    if (userInfo?.email) {
      navigate(redirect);
    }
    if (token !==''){
      switch(token){
        case 'valid':
          setActivationMsg('your account activated. Now you can login.')
          break;
        case 'invalid':
            setActivationMsg('your activation link is invalid. Please go to register page and try again.')
            break;
        default:
          break;
      }
    }
  }, [userInfo, navigate, redirect,token]);

  return (
    <FormContainer>
      <h1 className="mt-4">sign in </h1>
      {loading ?  <Loader />
         : error ? <Message variant="danger" text={error} />
              :token ==='valid' ? <Message variant='success' text={activationMsg}/>
                  :token ==='invalid' ? <Message variant='danger' text={activationMsg}/>
        :<></>
      }
      <Form onSubmit={submitHandler}>
        <FormGroup className="mt-4">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></Form.Control>
        </FormGroup>
        <FormGroup className="mt-4">
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></Form.Control>
        </FormGroup>
        <Button type="submit" className="mt-4 col-4">
          sign in
        </Button>
      </Form>
      <Row className="my-4">
        New Customer?
        <Col>
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginScreen;
