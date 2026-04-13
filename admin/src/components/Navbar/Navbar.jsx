import React from 'react'
import "./Navbar.css"
import { assets } from "../../assets/assets"

const Navbar = () => {
  return (
    <div className="navbar">
      {/* Left side (logo can go here later) */}
      <div></div>

      {/* Center title */}
      <h2 className="navbar-title">Admin Dashboard</h2>

      {/* Right side profile */}
      <img className="profile" src={assets.profile_image} alt="Profile" />
    </div>
  )
}

export default Navbar
