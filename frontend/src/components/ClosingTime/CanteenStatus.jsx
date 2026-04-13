import React, { useEffect, useState } from "react";
import "./CanteenStatus.css";

const CanteenStatus = () => {
  const openHour = 9;
  const closeHour = 18;
  const closeMinute = 30;

  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  const calculateTime = () => {
    const now = new Date();

    const openingTime = new Date();
    openingTime.setHours(openHour, 0, 0, 0);

    const closingTime = new Date();
    closingTime.setHours(closeHour, closeMinute, 0, 0);

    if (now >= openingTime && now < closingTime) {
      setIsOpen(true);

      const diff = closingTime - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor(
        (diff % (1000 * 60 * 60)) / (1000 * 60)
      );

      setTimeLeft(`${hours}h ${minutes}m`);
    } else {
      setIsOpen(false);
      setTimeLeft("");
    }
  };

  useEffect(() => {
    calculateTime();
    const interval = setInterval(calculateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`canteen-strip ${isOpen ? "open-bg" : "closed-bg"}`}>
      <div className="strip-content">
        <div className="left">
          <span className={`dot ${isOpen ? "live" : "offline"}`}></span>
          <span className="status-text">
            {isOpen ? "Canteen Open" : "Canteen Closed"}
          </span>
        </div>

        <div className="right">
          {isOpen
            ? `Closing in ${timeLeft}`
            : "Orders closed for today"}
        </div>
      </div>
    </div>
  );
};

export default CanteenStatus;

