
import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    getTotalCartAmount
  } = useContext(StoreContext);

  const navigate = useNavigate();

  // Get quantity safely
  const qtyOf = (id) => (cartItems && cartItems[id] ? cartItems[id] : 0);

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  // Filter only items in cart
  const itemsInCart = food_list.filter((item) => qtyOf(item._id) > 0);

  return (
    <div className="cart">
      <div className="cart-items">

        {/* ===== HEADER ===== */}
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        <hr />

        {/* ===== EMPTY CART ===== */}
        {itemsInCart.length === 0 ? (
          <div className="cart-empty">Your cart is empty.</div>
        ) : (

          itemsInCart.map((item) => {
            const quantity = qtyOf(item._id);

            return (
              <div key={item._id}>
                <div className="cart-items-item">

                  {/* ✅ CLOUDINARY IMAGE FIX */}
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={(e) => {
                      e.target.src = "/fallback.png"; // optional fallback
                    }}
                  />

                  {/* ===== DETAILS ===== */}
                  <div className="cart-item-details">
                    <p className="item-name">{item.name}</p>

                    <div className="mobile-row">
                      <span>Price:</span>
                      <span>₹{item.price}</span>
                    </div>

                    <div className="mobile-row">
                      <span>Qty:</span>
                      <span>{quantity}</span>
                    </div>

                    <div className="mobile-row">
                      <span>Total:</span>
                      <span>₹{item.price * quantity}</span>
                    </div>
                  </div>

                  {/* ===== DESKTOP VIEW ===== */}
                  <p className="desktop-only">₹{item.price}</p>
                  <p className="desktop-only">{quantity}</p>
                  <p className="desktop-only">
                    ₹{item.price * quantity}
                  </p>

                  {/* ===== REMOVE ===== */}
                  <p
                    onClick={() => handleRemove(item._id)}
                    className="cross"
                  >
                    X
                  </p>
                </div>

                <hr />
              </div>
            );
          })
        )}
      </div>

      {/* ===== CART TOTAL ===== */}
      <div className="cart-bottom">
        <div className="carttotal">
          <h2>Cart Total</h2>

          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <p>Service Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 1}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ₹
                {getTotalCartAmount() === 0
                  ? 0
                  : getTotalCartAmount() + 1}
              </b>
            </div>
          </div>

          <button
            onClick={() => navigate("/order")}
            disabled={getTotalCartAmount() === 0}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;