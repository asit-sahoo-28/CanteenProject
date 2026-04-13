


import React, { useEffect, useState, useContext, useRef } from "react";
import "./myorders.css";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";

const statusSteps = ["Placed", "Accepted", "Cooking", "Ready", "Delivered"];

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrders, setExpandedOrders] = useState({});
  const prevStatusRef = useRef({});

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      const res = await axios.post(
        `${url}/api/order/userorders`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        const newOrders = res.data.data;

        // Toast notification for status updates
        newOrders.forEach(order => {
          const prev = prevStatusRef.current[order._id];
          if (prev && prev !== order.status) {
            toast.info(`status updated to "${order.status}"`);
          }
          prevStatusRef.current[order._id] = order.status;
        });

        setOrders(newOrders);
      } else toast.error(res.data.message || "Failed to fetch orders");
    } catch (err) {
      toast.error("Failed to fetch orders");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      const res = await axios.post(
        `${url}/api/order/cancel`,
        { orderId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        toast.success("Order cancelled successfully");
        fetchOrders();
      } else toast.error(res.data.message);
    } catch (err) {
      toast.error("Failed to cancel order");
      console.error(err);
    }
  };

  const toggleTrack = (orderId) => {
    setExpandedOrders(prev => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
      const interval = setInterval(fetchOrders, 5000); // Refresh every 5s
      return () => clearInterval(interval);
    }
  }, [token]);

  return (
    <div className="myorders">
      <h1>My Orders</h1>

      {loading ? <p className="loading-text">Loading orders...</p> :
        orders.length === 0 ? <p className="loading-text">No orders found</p> :
        <div className="container">
          {orders.map(order => {
            const currentStepIndex = statusSteps.indexOf(order.status);

            return (
              <div key={order._id} className="my-orders-order">
                <img src={assets.parcel_icon} alt="order" />

                <div className="order-info">
                  <p className="order-items">
                    {order.items.map(i => `${i.name} x ${i.quantity}`).join(", ")}
                  </p>
                  <p className="order-amount">₹{order.amount}</p>
                </div>

                <div className="order-actions">
                  {order.status !== "Delivered" && order.status !== "Cancelled" && (
                    <button
                      className="track-btn"
                      onClick={() => toggleTrack(order._id)}
                    >
                      {expandedOrders[order._id] ? "Hide Tracking" : "Track Order"}
                    </button>
                  )}

                  {["Placed", "Accepted", "Cooking"].includes(order.status) && (
                    <button className="cancel-btn" onClick={() => cancelOrder(order._id)}>Cancel Order</button>
                  )}
                </div>

                {expandedOrders[order._id] && (
                  <div className="horizontal-timeline">
                    {statusSteps.map((step, idx) => (
                      <div key={step} className="timeline-step-container">
                        <div className={`timeline-step ${currentStepIndex > idx ? "completed" : currentStepIndex === idx ? "active" : ""}`}>
                          <span className="timeline-dot"></span>
                          <span className="timeline-label">{step}</span>
                        </div>

                        {idx !== statusSteps.length - 1 && (
                          <div className="timeline-bar">
                            <div className={`timeline-progress ${currentStepIndex > idx ? "filled" : ""}`}></div>
                            {currentStepIndex === idx && <span className="moving-dot"></span>}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      }
    </div>
  );
};

export default MyOrders;










// Order ${order._id}








