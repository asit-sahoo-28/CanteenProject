


import React, { useState, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import LoginPop from "./components/LoginPop/LoginPop";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/Myorders/MyOrders";
import FoodDisplay from "./components/FoodDisplay/FoodDisplay";
import { ToastContainer } from "react-toastify";
import MyProfile from "./pages/MyProfile/MyProfile";

import FoodSuggestion from "./components/FoodSuggestion/FoodSuggestion";
import WhatsAppButton from "./components/WhatsAppButton/WhatsAppButton";
import { StoreContext } from "./pages/context/StoreContext";
const App = () => {
  const [showLogin, setShowLogin] = useState(false);
    const { url } = useContext(StoreContext);
  return (
    <>
      <ToastContainer />

      {showLogin && <LoginPop setShowLogin={setShowLogin} />}

      <div className="app">

        {/* 🔥 NAVBAR */}
        <Navbar setShowLogin={setShowLogin} />

        {/* 🔥 PAGE CONTENT */}
        <div className="page-content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order" element={<PlaceOrder />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="/topDishes" element={<FoodDisplay />} />
              <Route path="/myorders" element={<MyOrders />} />
              <Route path="/myprofile" element={<MyProfile />} />
              
             
            </Routes>
          </div>
        </div>
        <FoodSuggestion url={url} />
        <Footer />
        {/* <WhatsAppButton /> */}
      </div>
    </>
  );
};

export default App;