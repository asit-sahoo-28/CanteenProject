
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OffersBanner.css";

const OffersBanner = () => {
  const [offers, setOffers] = useState([]);
  const [timeLeft, setTimeLeft] = useState({});

  /* ================= FETCH OFFERS ================= */
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/offers/active");
        if (res.data.success) {
          setOffers(res.data.offers);
        }
      } catch (error) {
        console.log("Failed to fetch offers");
      }
    };

    fetchOffers();
  }, []);

  /* ================= COUNTDOWN ================= */
  useEffect(() => {
    const updateCountdown = () => {
      const newTimes = {};

      offers.forEach((offer) => {
        const diff = new Date(offer.endDate) - new Date();

        if (diff > 0) {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor(
            (diff % (1000 * 60 * 60)) / (1000 * 60)
          );
          newTimes[offer._id] = `${hours}h ${minutes}m`;
        } else {
          newTimes[offer._id] = "Expired";
        }
      });

      setTimeLeft(newTimes);
    };

    updateCountdown(); // 🔥 run immediately
    const interval = setInterval(updateCountdown, 60000);

    return () => clearInterval(interval);
  }, [offers]);

  if (offers.length === 0) return null;

  return (
    <div className="offers-bar">
      <div className="offers-track">
        {offers.concat(offers).map((offer, index) => (
          <div key={index} className="offer-item">
            🔥 {offer.title}

            {offer.couponCode && (
              <span className="coupon-pill">
                Use Code: {offer.couponCode}
              </span>
            )}

            <span className="timer">
              Ends in: {timeLeft[offer._id] || "Loading..."}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OffersBanner;
