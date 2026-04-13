

import userModel from "../models/userModel.js";

// ================= ADD TO CART =================
const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    // Debug log (optional)
    console.log("AddToCart -> userId:", userId, "itemId:", itemId);

    // Check if user exists
    let userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // Ensure cartData exists
    let cartData = userData.cartData || {};

    // Add item
    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    // Update DB
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Item added to cart" });

  } catch (error) {
    console.log("AddToCart Error:", error);
    res.json({ success: false, message: "Error adding to cart" });
  }
};


// ================= REMOVE FROM CART =================
const removeCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    console.log("RemoveCart -> userId:", userId, "itemId:", itemId);

    let userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Item removed from cart" });

  } catch (error) {
    console.log("RemoveCart Error:", error);
    res.json({ success: false, message: "Error removing from cart" });
  }
};


// ================= GET CART =================
const getCart = async (req, res) => {
  try {
    const { userId } = req.body;

    console.log("GetCart -> userId:", userId);

    let userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    res.json({ success: true, cartData });

  } catch (error) {
    console.log("GetCart Error:", error);
    res.json({ success: false, message: "Error fetching cart" });
  }
};


// ================= EXPORT =================
export { addToCart, removeCart, getCart };