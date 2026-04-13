


import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const {
    getTotalCartAmount,
    getFinalAmount,
    discountAmount,
    applyCoupon,
    token,
    food_list,
    cartItems,
    url,
  } = useContext(StoreContext);

  const [couponCode, setCouponCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("ONLINE");
  const [loading, setLoading] = useState(false);

  // ✅ APPLY COUPON
  const handleApplyCoupon = async () => {
    if (!couponCode) {
      toast.error("Enter coupon code");
      return;
    }

    try {
      const res = await applyCoupon(couponCode);

      if (res.success) {
        toast.success("Coupon Applied 🎉");
      } else {
        toast.error(res.message || "Invalid coupon");
      }
    } catch {
      toast.error("Coupon apply failed");
    }
  };

  // ✅ PLACE ORDER
  const placeOrder = async () => {
    // 🔥 HARD PROTECTION (NO DOUBLE CLICK)
    if (loading) return;

    setLoading(true);

    console.log("🚀 PLACE ORDER CALLED"); // DEBUG

    let orderItems = [];

    food_list.forEach((food) => {
      if (cartItems[food._id] > 0) {
        orderItems.push({
          _id: food._id,
          name: food.name,
          price: food.price,
          quantity: cartItems[food._id],
        });
      }
    });

    if (orderItems.length === 0) {
      toast.error("Cart is empty");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        url + "/api/order/place",
        {
          items: orderItems,
          paymentMethod,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // =========================
      // 🟡 COD FLOW
      // =========================
      if (paymentMethod === "COD") {
        toast.success("Order placed successfully (COD)");

        // ✅ STOP LOADING
        setLoading(false);

        // ✅ REDIRECT
        window.location.href = "/myorders";
        return;
      }

      // =========================
      // 🟢 ONLINE FLOW
      // =========================
      if (res.data.session_url) {
        // 🔥 DIRECT REDIRECT (NO DELAY)
        window.location.href = res.data.session_url;
        return;
      }

      toast.error("Payment session not created");
      setLoading(false);

    } catch (err) {
      console.error(err);
      toast.error("Order Failed");
      setLoading(false);
    }
  };

  return (
    <div className="cart-total">
      <h2>Order Summary</h2>

      {/* Subtotal */}
      <div className="cart-total-details">
        <p>Subtotal</p>
        <p>₹{getTotalCartAmount()}</p>
      </div>

      {/* Service Fee */}
      <div className="cart-total-details">
        <p>Service Fee</p>
        <p>₹1</p>
      </div>

      {/* Coupon */}
      <div className="coupon-box">
        <input
          type="text"
          placeholder="Enter coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <button type="button" onClick={handleApplyCoupon}>
          Apply
        </button>
      </div>

      {/* Discount */}
      {discountAmount > 0 && (
        <div className="cart-total-details discount">
          <p>Discount</p>
          <p>- ₹{discountAmount}</p>
        </div>
      )}

      <hr />

      {/* Total */}
      <div className="cart-total-details">
        <b>Total</b>
        <b>₹{getFinalAmount() + 1}</b>
      </div>

      {/* Payment Method */}
      <div className="payment-method-box">
        <h3>Select Payment Method</h3>

        <label>
          <input
            type="radio"
            checked={paymentMethod === "ONLINE"}
            onChange={() => setPaymentMethod("ONLINE")}
          />
          Online Payment
        </label>

        <label>
          <input
            type="radio"
            checked={paymentMethod === "COD"}
            onChange={() => setPaymentMethod("COD")}
          />
          Cash On Delivery
        </label>
      </div>

      {/* Button */}
      <button
        type="button" // 🔥 VERY IMPORTANT
        className="proceed-btn"
        onClick={placeOrder}
        disabled={loading}
      >
        {loading ? "Redirecting..." : "Place Order"}
      </button>
    </div>
  );
};

export default PlaceOrder;