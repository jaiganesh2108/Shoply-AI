import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import ProductDetail from "./pages/ProductDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import Payment from "./pages/Payment";
import { getAccessTokenExpiry, redirectToLogin } from "./api/authUtils";

function App() {
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("access");
    const expiryTime = getAccessTokenExpiry(token);

    if (!expiryTime) {
      return undefined;
    }

    const remainingTime = expiryTime - Date.now();

    if (remainingTime <= 0) {
      redirectToLogin();
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      redirectToLogin();
    }, remainingTime);

    return () => window.clearTimeout(timeoutId);
  }, [location.pathname]);

  return (
    <>
    <Navbar />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/cart" element={ <ProtectedRoute> <Cart /> </ProtectedRoute> }/>
      <Route path="/orders" element={ <ProtectedRoute> <Orders /> </ProtectedRoute> }/>
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
      <Route path="/payment/:orderId" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
    </Routes>
    </>
  );
}

export default App;