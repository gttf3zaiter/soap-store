import { Navigate } from "react-router-dom";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";

import Orders from "./admin/Orders";
import AdminLogin from "./pages/AdminLogin";



function ProtectedAdmin({ children }) {

  const loggedIn = localStorage.getItem("adminLoggedIn");

  if (!loggedIn) {
    return <Navigate to="/admin" />;
  }

  return children;

}




function AppContent() {

  const [cart, setCart] = useState([]);

  const location = useLocation();

  const isAdmin = location.pathname.startsWith("/admin");


  function addToCart(product, quantity = 1) {

  setCart(currentCart => {

    const existing = currentCart.find(
      item => item.id === product.id
    );

    if (existing) {

      return currentCart.map(item =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + quantity
            }
          : item
      );

    }

    return [
      ...currentCart,
      {
        ...product,
        quantity
      }
    ];

  });

}


  return (

    <>

      {!isAdmin && <Navbar />}


      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/shop"
          element={<Shop addToCart={addToCart} />}
        />

       <Route
 path="/cart"
 element={
   <Cart 
     cart={cart}
     setCart={setCart}
   />
 }
/>

        <Route
          path="/checkout"
          element={<Checkout cart={cart} />}
        />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/product" element={<Product />} />









<Route
  path="/admin"
  element={<AdminLogin />}
/>












        <Route
  path="/admin/orders"
  element={
    <ProtectedAdmin>
      <Orders />
    </ProtectedAdmin>
  }
/>
      </Routes>

    </>

  );

}


function App() {

  return (

    <BrowserRouter>

      <AppContent />

    </BrowserRouter>

  );

}


export default App;