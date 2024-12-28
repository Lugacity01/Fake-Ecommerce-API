import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Auth/Login";
// import Dashboard from "./pages/dashboard/dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Product from "./pages/dashboard/Product";
import NotFound from "./pages/NotFound";
import Navbar from "./pages/Auth/components/NavBar/Navbar";
import GetSingleProduct from "./pages/dashboard/GetSingleProduct";
import AddNewProduct from "./pages/dashboard/AddNewProduct";
import Cart from "./pages/dashboard/Cart";
import Settings from "./pages/dashboard/Settings";
import Dashboard from "./pages/dashboard/Dashboard";



function App() {
  return (
   
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Route */}
          <Route element={<PrivateRoute />}>
            <Route element={<Navbar />}>
            <Route path="/" element=
              {<Dashboard />} />
              <Route path="products" element={<Product />} />
              <Route path="add-new-products" element={<AddNewProduct />} />
              <Route path="cart" element={<Cart />} />
              <Route path="/product/edit/:id" element={<AddNewProduct />} />
              <Route path="single-product/:id" element={<GetSingleProduct />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>

          {/* Catch-all route for undefined paths */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* Toast Notification Container */}
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>

      
  );
}

export default App;
