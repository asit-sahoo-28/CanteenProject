import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import "./WhatsAppButton.css"; // import the CSS file

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/7849047603?text=Hello%2C%20I%20would%20like%20to%20register%20for%20the%20canteen%20service.%20Please%20share%20the%20menu%20and%20registration%20details."
      target="_blank"
      rel="noopener noreferrer"
      title="Chat with us on WhatsApp"
      className="whatsapp-button"
    >
      <FaWhatsapp size={26} className="whatsapp-icon" />
    </a>
  );
}
