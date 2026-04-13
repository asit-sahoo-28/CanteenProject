




// import React, { useContext } from "react";
// import "./FoodItem.css";
// import { assets } from "../../assets/assets";
// import { StoreContext } from "../../context/StoreContext";
// import { toast } from "react-toastify";

// const FoodItem = ({ id, name, price, description, image }) => {
//   const {
//     cartItems,
//     addToCart,
//     removeFromCart,
//     url,
//     token, // 👈 token means user logged in
//   } = useContext(StoreContext);

//   const itemCount = cartItems?.[id] || 0;

//   // 🔒 Check login before action
//   const handleAdd = () => {
//     if (!token) {
//       toast.error("Please create an account or login first");
//       return;
//     }
//     addToCart(id);
//     toast.success(`item added to cart`);
//   };

//   const handleRemove = () => {
//     if (!token) {
//       toast.error("Please login to manage cart");
//       return;
//     }
//     removeFromCart(id);
//     toast.info(`item removed from cart`);
//   };

//   return (
//     <div className="food-item">
//       <div className="food-item-img-container">
//         <img
//           className="food-item-image"
//           src={`${url}/images/${image}`}
//           alt={name}
//         />

//         {itemCount === 0 ? (
//           <img
//             className="add"
//             onClick={handleAdd}
//             src={assets.add_icon_white}
//             alt="add"
//           />
//         ) : (
//           <div className="food-item-counter">
//             <img
//               onClick={handleRemove}
//               src={assets.remove_icon_red}
//               alt="remove"
//             />
//             <p>{itemCount}</p>
//             <img
//               onClick={handleAdd}
//               src={assets.add_icon_green}
//               alt="add"
//             />
//           </div>
//         )}
//       </div>

//       <div className="food-item-info">
//         <div className="food-item-name-rating">
//           <p>{name}</p>
//           <img src={assets.rating_starts} alt="rating" />
//         </div>
//         <p className="food-item-desc">{description}</p>
//         <p className="food-item-price">₹{price}</p>
//       </div>
//     </div>
//   );
// };

// export default FoodItem;




















// import React, { useContext } from "react";
// import "./FoodItem.css";
// import { assets } from "../../assets/assets";
// import { StoreContext } from "../../context/StoreContext";
// import { toast } from "react-toastify";

// const FoodItem = ({ id, name, price, description, image }) => {
//   const {
//     cartItems,
//     addToCart,
//     removeFromCart,
//     token,
//   } = useContext(StoreContext);

//   const itemCount = cartItems?.[id] || 0;

//   // 🔒 Check login before action
//   const handleAdd = () => {
//     if (!token) {
//       toast.error("Please create an account or login first");
//       return;
//     }
//     addToCart(id);
//     toast.success("Item added to cart");
//   };

//   const handleRemove = () => {
//     if (!token) {
//       toast.error("Please login to manage cart");
//       return;
//     }
//     removeFromCart(id);
//     toast.info("Item removed from cart");
//   };

//   return (
//     <div className="food-item">
//       <div className="food-item-img-container">
        
//         {/* ✅ Cloudinary Image Direct */}
//         <img
//           className="food-item-image"
//           src={image}
//           alt={name}
//         />

//         {itemCount === 0 ? (
//           <img
//             className="add"
//             onClick={handleAdd}
//             src={assets.add_icon_white}
//             alt="add"
//           />
//         ) : (
//           <div className="food-item-counter">
//             <img
//               onClick={handleRemove}
//               src={assets.remove_icon_red}
//               alt="remove"
//             />
//             <p>{itemCount}</p>
//             <img
//               onClick={handleAdd}
//               src={assets.add_icon_green}
//               alt="add"
//             />
//           </div>
//         )}
//       </div>

//       <div className="food-item-info">
//         <div className="food-item-name-rating">
//           <p>{name}</p>
//           <img src={assets.rating_starts} alt="rating" />
//         </div>

//         <p className="food-item-desc">{description}</p>
//         <p className="food-item-price">₹{price}</p>
//       </div>
//     </div>
//   );
// };

// export default FoodItem;
















// import React, { useContext } from "react";
// import "./FoodItem.css";
// import { assets } from "../../assets/assets";
// import { StoreContext } from "../../context/StoreContext";
// import { toast } from "react-toastify";

// const FoodItem = ({
//   id,
//   name,
//   price,
//   description,
//   image,
//   stock = 20,        // ⭐ NEW
//   isFlashSale = false // ⭐ NEW
// }) => {

//   const {
//     cartItems,
//     addToCart,
//     removeFromCart,
//     token,
//   } = useContext(StoreContext);

//   const itemCount = cartItems?.[id] || 0;

//   // 🔒 Check login before action
//   const handleAdd = () => {
//     if (!token) {
//       toast.error("Please create an account or login first");
//       return;
//     }

//     if (stock === 0) {
//       toast.error("Item is out of stock");
//       return;
//     }

//     addToCart(id);
//     toast.success("Item added to cart");
//   };

//   const handleRemove = () => {
//     if (!token) {
//       toast.error("Please login to manage cart");
//       return;
//     }
//     removeFromCart(id);
//     toast.info("Item removed from cart");
//   };

//   return (
//     <div className="food-item">

//       <div className="food-item-img-container">

//         {/* ✅ Image */}
//         <img
//           className="food-item-image"
//           src={image}
//           alt={name}
//         />

//         {/* ⭐ FLASH SALE */}
//         {isFlashSale && (
//           <span className="flash-badge">⚡ FLASH SALE</span>
//         )}

//         {/* ⭐ SELL FAST */}
//         {stock < 10 && stock > 5 && (
//           <span className="sellfast-badge">🔥 SELLING FAST</span>
//         )}

//         {/* ⭐ ONLY FEW LEFT */}
//         {stock <= 5 && stock > 0 && (
//           <span className="onlyfew-badge">⚠ Only {stock} Left</span>
//         )}

//         {/* ⭐ OUT OF STOCK */}
//         {stock === 0 && (
//           <span className="out-badge">❌ OUT OF STOCK</span>
//         )}

//         {/* ⭐ CART BUTTON AREA */}
//         {stock > 0 && (
//           itemCount === 0 ? (
//             <img
//               className="add"
//               onClick={handleAdd}
//               src={assets.add_icon_white}
//               alt="add"
//             />
//           ) : (
//             <div className="food-item-counter">
//               <img
//                 onClick={handleRemove}
//                 src={assets.remove_icon_red}
//                 alt="remove"
//               />
//               <p>{itemCount}</p>
//               <img
//                 onClick={handleAdd}
//                 src={assets.add_icon_green}
//                 alt="add"
//               />
//             </div>
//           )
//         )}

//       </div>

//       <div className="food-item-info">
//         <div className="food-item-name-rating">
//           <p>{name}</p>
//           <img src={assets.rating_starts} alt="rating" />
//         </div>

//         <p className="food-item-desc">{description}</p>
//         <p className="food-item-price">₹{price}</p>
//       </div>

//     </div>
//   );
// };

// export default FoodItem;





// import React, { useContext } from "react";
// import "./FoodItem.css";
// import { assets } from "../../assets/assets";
// import { StoreContext } from "../../context/StoreContext";
// import { toast } from "react-toastify";

// const FoodItem = ({
//   id,
//   name,
//   price,
//   description,
//   image,
//   stock,
//   isFlashSale,
// }) => {
//   const { cartItems, addToCart, removeFromCart, token } =
//     useContext(StoreContext);

//   const itemCount = cartItems?.[id] || 0;

//   const handleAdd = () => {
//     if (!token) {
//       toast.error("Please create an account or login first");
//       return;
//     }
//     addToCart(id);
//     toast.success("Item added to cart");
//   };

//   const handleRemove = () => {
//     if (!token) {
//       toast.error("Please login to manage cart");
//       return;
//     }
//     removeFromCart(id);
//     toast.info("Item removed from cart");
//   };

//   return (
//     <div className="food-item">
//       <div className="food-item-img-container">
        
//         <img className="food-item-image" src={image} alt={name} />

//         {/* ⭐ FLASH SALE */}
//         {isFlashSale && (
//           <span className="flash-badge">⚡ FLASH SALE</span>
//         )}

//         {/* ⭐ SELL FAST */}
//         {stock < 10 && stock > 5 && (
//           <span className="sellfast-badge">🔥 SELLING FAST</span>
//         )}

//         {/* ⭐ ONLY FEW LEFT */}
//         {stock <= 5 && stock > 0 && (
//           <span className="onlyfew-badge">⚠ Only {stock} Left</span>
//         )}

//         {/* ⭐ OUT OF STOCK */}
//         {stock === 0 && (
//           <span className="out-badge">❌ OUT OF STOCK</span>
//         )}

//         {itemCount === 0 ? (
//           <img
//             className="add"
//             onClick={handleAdd}
//             src={assets.add_icon_white}
//             alt="add"
//           />
//         ) : (
//           <div className="food-item-counter">
//             <img
//               onClick={handleRemove}
//               src={assets.remove_icon_red}
//               alt="remove"
//             />
//             <p>{itemCount}</p>
//             <img
//               onClick={handleAdd}
//               src={assets.add_icon_green}
//               alt="add"
//             />
//           </div>
//         )}
//       </div>

//       <div className="food-item-info">
//         <div className="food-item-name-rating">
//           <p>{name}</p>
//           <img src={assets.rating_starts} alt="rating" />
//         </div>

//         <p className="food-item-desc">{description}</p>
//         <p className="food-item-price">₹{price}</p>
//       </div>
//     </div>
//   );
// };

// export default FoodItem;














// import React, { useContext } from "react";
// import "./FoodItem.css";
// import { StoreContext } from "../../context/StoreContext";

// const FoodItem = ({
//   id,
//   name,
//   description,
//   price,
//   image,
//   stock,
//   isFlashSale,
//   isAvailable,
// }) => {
//   const { cartItems, addToCart, removeFromCart } =
//     useContext(StoreContext);

//   const isOutOfStock = stock <= 0;
//   const isDisabled = !isAvailable || isOutOfStock;

//   return (
//     <div className={`food-item ${isDisabled ? "disabled-food" : ""}`}>
//       <div className="food-item-img-container">
//         <img className="food-item-image" src={image} alt={name} />

//         {isFlashSale && <span className="flash-badge">⚡ Flash Sale</span>}
//         {!isAvailable && <span className="unavailable-badge">Unavailable</span>}
//         {isOutOfStock && <span className="stock-badge">Out of Stock</span>}
//       </div>

//       <div className="food-item-info">
//         <h3>{name}</h3>
//         <p>{description}</p>
//         <h4>₹{price}</h4>

//         {/* CART BUTTON */}
//         {isDisabled ? (
//           <button className="disabled-btn" disabled>
//             Not Available
//           </button>
//         ) : (
//           <div className="cart-controls">
//             {!cartItems[id] ? (
//               <button onClick={() => addToCart(id)}>Add to Cart</button>
//             ) : (
//               <div className="counter">
//                 <button onClick={() => removeFromCart(id)}>-</button>
//                 <span>{cartItems[id]}</span>
//                 <button onClick={() => addToCart(id)}>+</button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FoodItem;





import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../pages/context/StoreContext";
import { toast } from "react-toastify";

const FoodItem = ({
  id,
  name,
  price,
  description,
  image,
  stock = 20,
  isFlashSale = false,
  isAvailable = true,
}) => {
  const { cartItems, addToCart, removeFromCart, token } =
    useContext(StoreContext);

  const itemCount = cartItems?.[id] || 0;

  const isOutOfStock = stock <= 0;
  const isDisabled = !isAvailable || isOutOfStock;

  // ✅ ADD
  const handleAdd = () => {
    if (isDisabled) {
      toast.error("Item not available");
      return;
    }

    if (!token) {
      toast.error("Please login first");
      return;
    }

    addToCart(id);
    toast.success("Item added");
  };

  // ✅ REMOVE
  const handleRemove = () => {
    if (!token) {
      toast.error("Please login first");
      return;
    }
    removeFromCart(id);
  };

  return (
    <div className={`food-item ${isDisabled ? "disabled-food" : ""}`}>
      <div className="food-item-img-container">
        <img className="food-item-image" src={image} alt={name} />

        {/* ⭐ FLASH SALE */}
        {isFlashSale && isAvailable && (
          <span className="flash-badge">⚡ FLASH SALE</span>
        )}

        {/* ⭐ UNAVAILABLE */}
        {!isAvailable && (
          <span className="unavailable-badge">Unavailable</span>
        )}

        {/* ⭐ OUT OF STOCK */}
        {isOutOfStock && (
          <span className="out-badge">❌ OUT OF STOCK</span>
        )}

        {/* ⭐ SELL FAST */}
        {isAvailable && stock < 10 && stock > 5 && (
          <span className="sellfast-badge">🔥 SELLING FAST</span>
        )}

        {/* ⭐ ONLY FEW LEFT */}
        {isAvailable && stock <= 5 && stock > 0 && (
          <span className="onlyfew-badge">⚠ Only {stock} Left</span>
        )}

        {/* CART ICON CONTROLS */}
        {!isDisabled && (
          itemCount === 0 ? (
            <img
              className="add"
              onClick={handleAdd}
              src={assets.add_icon_white}
              alt="add"
            />
          ) : (
            <div className="food-item-counter">
              <img
                onClick={handleRemove}
                src={assets.remove_icon_red}
                alt="remove"
              />
              <p>{itemCount}</p>
              <img
                onClick={handleAdd}
                src={assets.add_icon_green}
                alt="add"
              />
            </div>
          )
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="rating" />
        </div>

        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">₹{price}</p>

        {/* TEXT BUTTON LIKE SECOND SCREENSHOT */}
        {isDisabled && (
          <button className="not-available-btn" disabled>
            Not Available
          </button>
        )}
      </div>
    </div>
  );
};

export default FoodItem;