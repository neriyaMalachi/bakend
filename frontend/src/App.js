import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeFile from "./component/HomeFile";
import ProductFile from "./component/ProductFile";
import CartScreen from "./component/CartScreen";
import SigninScreen from "./component/SigninScreen";
import ShippingAddressScreen from "./component/shippingAddressScreen";
import SignupScreen from "./component/SignupScreen";
import PaymentMethodScreen from "./component/PaymentMethodScreen";
import { Box, ChakraProvider } from "@chakra-ui/react";
import PlaceOrderScreen from "./component/PlaceOrderScreen";
import OrderScreen from "./component/OrderScreen";
import OrderHistoryScreen from "./component/OrderHistoryScreen";
import ProfileScreen from "./component/ProfileScreen";
import ProtectedRoute from "./component/ProtectedRoute";
import Users from "./component/AdminFolder/Users";
import AdminRoutes from "./component/AdminRoutes";
import Products from "./component/AdminFolder/Products";
import Orders from "./component/AdminFolder/Orders";
import FootherFile from "./component/FootherFile";
import AddUser from "./component/AdminFolder/AddUser";
import EditProductes from "./component/AdminFolder/EditProductes";
import ForgetPassword from "./component/ForgetPassword";
import NavBar from "./component/NavBar";
import FaivoritsList from "./component/FaivoritsList";
import ReviewFile from "./component/ReviewFile";

function App() {
  return (
    <Box>
      <ChakraProvider>
        <BrowserRouter>
          <NavBar/>
          <Routes>
            <Route path="/forgetPassword" element={<ForgetPassword />} />
            <Route path="/product/:slug" element={<ProductFile />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/" element={<SigninScreen />} />
            <Route path="/home" element={<HomeFile />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route path="/payment" element={<PaymentMethodScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/faivoritList" element={<FaivoritsList />} />
            <Route path="/reviewFile" element={<ReviewFile />} />
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
            <Route
              path="/Admin/products"
              element={
                <AdminRoutes>
                  <Products />
                </AdminRoutes>
              }
            />
            <Route
              path="/Admin/orders"
              element={
                <AdminRoutes>
                  <Orders />
                </AdminRoutes>
              }
            />
            <Route
              path="/Admin/users"
              element={
                <AdminRoutes>
                  <Users />
                </AdminRoutes>
              }
            />
            <Route
              path="/Admin/addUser"
              element={
                <AdminRoutes>
                  <AddUser />
                </AdminRoutes>
              }
            />
            <Route
              path="/Admin/EditProductes/:id"
              element={
                <AdminRoutes>
                  <EditProductes />
                </AdminRoutes>
              }
            />
          </Routes>
          
          <FootherFile />
        </BrowserRouter>
      </ChakraProvider>
    </Box>
  );
}

export default App;
