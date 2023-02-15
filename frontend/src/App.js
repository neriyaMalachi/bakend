import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeFile from "./component/HomeFile";
import NavBar from "./component/NavBar";
import ProductFile from "./component/ProductFile";
import CartScreen from "./component/CartScreen";
import SigninScreen from "./component/SigninScreen";
import ShippingAddressScreen from "./component/ShippingAddressScreen";
import SignupScreen from "./component/SignupScreen";
import PaymentMethodScreen from "./component/PaymentMethodScreen";
import { Box, ChakraProvider, Image } from "@chakra-ui/react";
import PlaceOrderScreen from "./component/PlaceOrderScreen";
import OrderScreen from "./component/OrderScreen";
import OrderHistoryScreen from "./component/OrderHistoryScreen";
import ProfileScreen from "./component/ProfileScreen";
import ProtectedRoute from "./component/ProtectedRoute";
import DashboardScreen from "./component/DashboardScreen";
import AdminRoutes from "./component/AdminRoutes";
import bgImage from './img/hookah-bar-bg.png'

function App() {
  return (
    <Box
   bgImage={bgImage}
   bgRepeat="no-repeat"
   bgSize="100% 100%"
   bgAttachment="fixed"
 
    >
    <ChakraProvider >
      <BrowserRouter>
        <NavBar />
        <Routes >
          <Route path="/product/:slug" element={<ProductFile />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/signIn" element={<SigninScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/payment" element={<PaymentMethodScreen />} />
          <Route path="/placeorder" element={<PlaceOrderScreen />} />
          <Route path="/shipping" element={<ShippingAddressScreen />}></Route>
          <Route
            path="/orderHistory"
            element={
              <ProtectedRoute>
                <OrderHistoryScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfileScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/:id"
            element={
              <ProtectedRoute>
                <OrderScreen />
              </ProtectedRoute>
            }
          />
          {/* Admin routes */}
          <Route path="/Admin/dashboard" element={<AdminRoutes><DashboardScreen/></AdminRoutes>}/>
          <Route path="/" element={<HomeFile />} />

        </Routes>
      </BrowserRouter>
    </ChakraProvider>
    </Box>
  );
}

export default App;
