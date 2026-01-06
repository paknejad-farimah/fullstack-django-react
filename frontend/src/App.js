import Footer from "./componnent/Footer";
import Header from "./componnent/Header";
import { Container } from "react-bootstrap";
import HomeScreens from "./screens/HomeScreens";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreens from "./screens/PaymentScreens";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import PayResultScreen from "./screens/PayResultScreen";
import PrivateComponent from "./componnent/PrivateComponent";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreens />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreens />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/order/:orderId" element={<OrderScreen />} />
            <Route path="/pay-result/:token" element={
              <PrivateComponent component={PayResultScreen}/>

            } />


          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
