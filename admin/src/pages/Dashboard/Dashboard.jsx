








import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  // 📦 Fetch all orders
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);

      if (response.data.success) {
        const data = response.data.data;
        setOrders(data);
        calculateStats(data);
      } else {
        toast.error("Failed to load dashboard data");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    }
  };

  // 📊 Calculate dashboard statistics (ignore cancelled orders)
  const calculateStats = (ordersData) => {
    let ordersCount = 0;
    let revenue = 0;
    let products = 0;

    ordersData.forEach((order) => {
      if (order.status === "Cancelled") return; // ❌ Ignore cancelled

      ordersCount += 1;
      revenue += order.amount;

      order.items.forEach((item) => {
        products += item.quantity;
      });
    });

    setTotalOrders(ordersCount);
    setTotalRevenue(revenue);
    setTotalProducts(products);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ❌ Filter cancelled orders from recent orders
  const activeOrders = orders.filter(
    (order) => order.status !== "Cancelled"
  );

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Dashboard Analytics</h1>

      {/* 📊 Stats Cards */}
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <p className="card-title">Total Orders</p>
          <h2>{totalOrders}</h2>
        </div>

        <div className="dashboard-card">
          <p className="card-title">Total Revenue</p>
          <h2>₹{totalRevenue}</h2>
        </div>

        <div className="dashboard-card">
          <p className="card-title">Total Products Sold</p>
          <h2>{totalProducts}</h2>
        </div>
      </div>

      {/* 📦 Recent Orders */}
      <div className="dashboard-orders">
        <h2>Recent Orders</h2>

        {activeOrders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          activeOrders.slice(0, 5).map((order, index) => (
            <div key={order._id || index} className="recent-order">
              <p><b>ID:</b> {order._id}</p>
              <p><b>Amount:</b> ₹{order.amount}</p>
              <p><b>Status:</b> {order.status}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;



















