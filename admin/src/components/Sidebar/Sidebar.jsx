

import React, { useState, useRef, useEffect } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Close when clicking outside
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
      {/* MENU BUTTON */}
      {!sidebarOpen && (
        <div className="menu-open-btn" onClick={() => setSidebarOpen(true)}>
          ☰
        </div>
      )}

      {/* OVERLAY */}
      {sidebarOpen && <div className="sidebar-overlay"></div>}

      {/* SIDEBAR */}
      <div
        ref={sidebarRef}
        className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}
      >
        {/* CLOSE BUTTON */}
        <div className="close-btn" onClick={() => setSidebarOpen(false)}>
          ✕
        </div>

        {/* ✅ BRAND LOGO */}
        <div className="sidebar-logo">
          🍽️ My<span>Canteen</span>
        </div>

        {/* MENU OPTIONS */}
        <div className="sidebar-options">

          <NavLink
            to="/add"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `sidebar-option ${isActive ? "active" : ""}`
            }
          >
            <img src={assets.add_icon} alt="" />
            <p>Add Items</p>
          </NavLink>

          <NavLink
            to="/list"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `sidebar-option ${isActive ? "active" : ""}`
            }
          >
            <img src={assets.order_icon} alt="" />
            <p>List Items</p>
          </NavLink>

          <NavLink
            to="/orders"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `sidebar-option ${isActive ? "active" : ""}`
            }
          >
            <img src={assets.order_icon} alt="" />
            <p>Orders</p>
          </NavLink>

          <NavLink
            to="/dashboard"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `sidebar-option ${isActive ? "active" : ""}`
            }
          >
            <img src={assets.order_icon} alt="" />
            <p>Sales Overview</p>
          </NavLink>

          <NavLink
            to="/coupon"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `sidebar-option ${isActive ? "active" : ""}`
            }
          >
            <img src={assets.order_icon} alt="" />
            <p>Coupon</p>
          </NavLink>

          <NavLink
            to="/update"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `sidebar-option ${isActive ? "active" : ""}`
            }
          >
            <img src={assets.order_icon} alt="" />
            <p>Updates</p>
          </NavLink>

        </div>
      </div>
    </>
  );
};

export default Sidebar;
