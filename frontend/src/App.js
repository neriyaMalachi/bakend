import "./App.css";
import {BrowserRouter, Route, Routes}from "react-router-dom"
import HomeFile from "./component/HomeFile";
import NavBar from "./component/NavBar";
import ProductFile from "./component/ProductFile";
import CartScreen from "./component/CartScreen";
import SigninScreen from "./component/SigninScreen";
import ShippingAddressScreen from "./component/ShippingAddressScreen";
import SignupScreen from "./component/SignupScreen";
import PaymentMethodScreen from "./component/PaymentMethodScreen";
import { ChakraProvider } from "@chakra-ui/react";
function App() {
return(
  <ChakraProvider>
  <BrowserRouter>
  <NavBar/>
  <Routes>
    <Route path="/" element={<HomeFile />}/>
    <Route path="/product/:slug" element={<ProductFile />}/>
    <Route path="/cart" element={<CartScreen/>}/>
    <Route path="/shipping" element={<ShippingAddressScreen/>}/>
    <Route path="/signIn" element={<SigninScreen/>}/>
    <Route path="/signup" element={<SignupScreen/>}/>
    <Route path="/payment" element={<PaymentMethodScreen/>}/>

  </Routes>
  </BrowserRouter>
  </ChakraProvider>
  )
}

export default App;
