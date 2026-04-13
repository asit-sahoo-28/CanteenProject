
import React, { useEffect, useState, useRef } from "react";
import "./Orders.css";
import axios from "axios";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

const statusSteps = [
  "Placed",
  "Accepted",
  "Cooking",
  "Ready",
  "Delivered",
  "Cancelled",
];

const Orders = ({ url, token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const audioRef = useRef(null);
  const lastOrderId = useRef(null);

  // ✅ FETCH ORDERS
  const fetchAllOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/order/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setOrders(res.data.data);

        // ✅ SET LAST ORDER ONLY FIRST TIME
        if (!lastOrderId.current && res.data.data.length > 0) {
          lastOrderId.current = res.data.data[0]._id;
        }
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  // 🔔 PLAY SOUND
  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 1;
      audioRef.current.play().catch(() => {});
    }
  };

  // 🔓 UNLOCK AUDIO (browser policy)
  const unlockAudio = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        })
        .catch(() => {});
    }
    document.removeEventListener("click", unlockAudio);
  };

  useEffect(() => {
    fetchAllOrders();

    document.addEventListener("click", unlockAudio);

    // ✅ SOCKET CONNECTION
    const socket = io(url);

    socket.emit("join_admin");

    socket.on("new_order", (data) => {
      console.log("🔥 New Order:", data);

      // ✅ FIXED: use _id (not orderId)
      if (lastOrderId.current !== data._id) {
        playSound();
        toast.success("New Order Received!");

        // ✅ INSTANT ADD (NO API CALL)
        setOrders((prev) => [data, ...prev]);

        lastOrderId.current = data._id;
      }
    });

    return () => socket.disconnect();
  }, []);

  // ✅ UPDATE STATUS
  const updateStatus = async (orderId, newStatus) => {
    try {
      const res = await axios.post(
        `${url}/api/order/status`,
        { orderId, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        toast.success(`Status updated to "${newStatus}"`);

        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        toast.error(res.data.message);
      }
    } catch {
      toast.error("Failed to update status");
    }
  };

  // ✅ COD PAYMENT
  const receivePayment = async (orderId) => {
    try {
      const res = await axios.post(
        `${url}/api/order/receive-cod`,
        { orderId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        toast.success("COD Payment Received");

        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId
              ? { ...order, payment: true, paymentReceived: true }
              : order
          )
        );
      }
    } catch {
      toast.error("Failed to update payment");
    }
  };

  // 🎨 STATUS COLOR
  const getStatusClass = (status) => {
    switch (status) {
      case "Placed": return "status-placed";
      case "Accepted": return "status-accepted";
      case "Cooking": return "status-cooking";
      case "Ready": return "status-ready";
      case "Delivered": return "status-delivered";
      case "Cancelled": return "status-cancelled";
      default: return "";
    }
  };

  return (
    <div className="orders">
      <h1 className="orders-title">All Orders</h1>

      {/* 🔊 AUDIO */}
      <audio ref={audioRef} src="/notification.ogg" preload="auto" />

      <div className="orders-container">
        {loading ? (
          <p className="orders-empty">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="orders-empty">No orders found</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="order-card">

              <p><b>Order ID:</b> {order._id}</p>
              <p><b>Amount:</b> ₹{order.amount}</p>

              <p>
                Status:{" "}
                <span className={getStatusClass(order.status)}>
                  {order.status}
                </span>
              </p>

              <p>
                Payment Method: <b>{order.paymentMethod}</b>
              </p>

              <p>
                Payment Status:{" "}
                <b>
                  {order.payment
                    ? "Paid"
                    : order.paymentReceived
                    ? "COD Received"
                    : "Pending"}
                </b>
              </p>

              {/* STATUS CHANGE */}
              <select
                value={order.status}
                onChange={(e) =>
                  updateStatus(order._id, e.target.value)
                }
              >
                {statusSteps.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              {/* COD BUTTON */}
              {order.paymentMethod === "COD" &&
                !order.paymentReceived && (
                <button
                  className="receive-cod-btn"
                  onClick={() => receivePayment(order._id)}
                >
                  Receive COD Payment
                </button>
              )}

              {/* ITEMS */}
              <div className="order-items">
                <ul>
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.name} x {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;