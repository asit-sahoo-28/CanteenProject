




import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../pages/context/StoreContext";
import "./Navbar.css";
import { UtensilsCrossed } from "lucide-react";

const Navbar = ({ setShowLogin }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const { token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setSidebarOpen(false);
    navigate("/");
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  return (
    <>
      {/* Menu open button */}
      {!sidebarOpen && (
        <div className="menu-open-btn" onClick={() => setSidebarOpen(true)}>
          ☰
        </div>
      )}

      {/* Overlay */}
      {sidebarOpen && <div className="sidebar-overlay"></div>}

      {/* Sidebar */}
      <div ref={sidebarRef} className={`navbar ${sidebarOpen ? "open" : ""}`}>
        {/* Close button */}
        <div className="close-btn" onClick={() => setSidebarOpen(false)}>
          ✕
        </div>

        {/* Logo */}
        <Link
          to="/"
          onClick={() => setSidebarOpen(false)}
          className="logo-wrapper"
        >
          <h1 className="logo-text">
            <UtensilsCrossed className="logo-icon" />
            My<span>Canteen</span>
          </h1>
        </Link>

        {/* Cart */}
        <Link
          to="/cart"
          className="cart-btn"
          onClick={() => setSidebarOpen(false)}
        >
          <img src={assets.basket_icon} alt="cart" />
          <span className="cart-dot"></span>
        </Link>

        {/* Menu links */}
        <ul className="navbar-menu">
          <Link to="/" onClick={() => setSidebarOpen(false)}>
            Home
          </Link>
          <a href="#explor-menu" onClick={() => setSidebarOpen(false)}>
            Menu
          </a>
{/* <Link to="/about" onClick={() => setSidebarOpen(false)}>
  About Us
</Link> */}
          <a href="#footer" onClick={() => setSidebarOpen(false)}>
            Contact Us
          </a>
        </ul>

        {/* Bottom section */}
        <div className="nav-bottom">
          {!token ? (
            <button
              onClick={() => {
                setSidebarOpen(false); // ✅ CLOSE SIDEBAR
                setShowLogin(true); // ✅ OPEN LOGIN / SIGNUP
              }}
            >
              Sign In
            </button>
          ) : (
            <div className="navbar-profile-section">
              <button
                className="profile-btn"
                onClick={() => {
                  setSidebarOpen(false);
                  navigate("/myprofile");
                }}
              >
                My Profile
              </button>

              {/* <button
                className="profile-btn"
                onClick={() => {
                  setSidebarOpen(false);
                  navigate("/rewards");
                }}
              >
                Daily Rewards Spin
              </button> */}

              <button
                className="profile-btn"
                onClick={() => {
                  setSidebarOpen(false);
                  navigate("/myorders");
                }}
              >
                My Orders
              </button>

              <button className="profile-btn logout" onClick={logout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;

