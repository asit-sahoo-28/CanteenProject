

import React, { useContext, useEffect, useRef, useState } from "react";
import "./Home.css";

import Header from "../../components/Headers/Header";
import ExplorMenu from "../../components/ExplorMenu/ExplorMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";
import Popular from "../../components/Popular/Popular";
import Hero from "../../components/Hero/Hero";
// import Serach from "../../components/SearchBar/Serach";

import { StoreContext } from "../context/StoreContext";
import CanteenStatus from "../../components/ClosingTime/CanteenStatus";
import OffersBanner from "../../components/offer/OffersBanner";



const Home = () => {
  const [category, setCategory] = useState("All");
  const { searchActive } = useContext(StoreContext);
  const foodRef = useRef(null); // ref for FoodDisplay

  // Auto-scroll to FoodDisplay when search starts
  useEffect(() => {
    if (searchActive && foodRef.current) {
      foodRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [searchActive]);

  return (
    <div>
      
      {/* Search bar always visible */}

      {/* <Serach /> */}

      {/* Hide top sections when searching */}
      {!searchActive && (
        <>
          {/* Header receives ref to scroll when View Menu clicked */}
          <Header foodRef={foodRef} />
              <CanteenStatus/>
          {/* Explore menu */}
          <ExplorMenu category={category} setCategory={setCategory} />
           <OffersBanner/>
          {/* Hero / Banner */}
          <Hero />
        </>
      )}

      {/* FoodDisplay always rendered */}
      <FoodDisplay ref={foodRef} category={category} />
        {/* <SeatReservation/> */}
      {/* Hide extra sections during search */}
      {!searchActive && (
        <>
          <Popular category={category} />
          <AppDownload />
        </>
      )}
    </div>
  );
};

export default Home;
