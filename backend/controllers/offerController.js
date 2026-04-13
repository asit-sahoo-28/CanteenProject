
import Offer from "../models/Offer.js";
import User from "../models/userModel.js";


export const addOffer = async (req, res) => {
  try {
    console.log("Incoming offer data:", req.body); // Debugging

    const offer = await Offer.create(req.body);

    res.status(201).json({
      success: true,
      message: "Offer created successfully",
      offer,
    });
  } catch (error) {
    console.error("Add offer error:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({ success: false, message: error.message });
    }
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "Coupon code already exists" });
    }

    res.status(500).json({ success: false, message: "Failed to create offer" });
  }
};




/* =========================
   GET ACTIVE OFFERS
========================= */
export const getActiveOffers = async (req, res) => {
  try {
    const now = new Date();

    const offers = await Offer.find({
      isActive: true,
      startDate: { $lte: now },
      endDate: { $gte: now },
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      offers,
    });
  } catch (error) {
    console.error("Get offers error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch offers",
    });
  }
};

/* =========================
   APPLY COUPON
========================= */
export const applyCoupon = async (req, res) => {
  try {
    const { couponCode, cartTotal } = req.body;

    if (!couponCode || !cartTotal) {
      return res.json({
        success: false,
        message: "Coupon code and cart total required",
      });
    }

    const normalizedCode = couponCode.trim().toUpperCase();

    const offer = await Offer.findOne({
      couponCode: normalizedCode,
      isActive: true,
    });

    if (!offer) {
      return res.json({
        success: false,
        message: "Invalid coupon code",
      });
    }

    const now = new Date();

    // Date validation
    if (now < offer.startDate || now > offer.endDate) {
      return res.json({
        success: false,
        message: "Coupon expired or not started",
      });
    }

    // Minimum order validation
    if (cartTotal < offer.minOrderAmount) {
      return res.json({
        success: false,
        message: `Minimum order ₹${offer.minOrderAmount} required`,
      });
    }

    // First order validation
    if (offer.isFirstOrderOnly) {
      const userOrders = await User.findById(req.userId);

      if (userOrders && userOrders.orders && userOrders.orders.length > 0) {
        return res.json({
          success: false,
          message: "This coupon is valid only for first order",
        });
      }
    }

    let discount = 0;

    if (offer.discountType === "percentage") {
      discount = (cartTotal * offer.discountValue) / 100;

      if (offer.maxDiscountAmount) {
        discount = Math.min(discount, offer.maxDiscountAmount);
      }
    } else if (offer.discountType === "flat") {
      discount = offer.discountValue;
    }

    // Prevent negative amount
    const finalAmount = Math.max(cartTotal - discount, 0);

    res.json({
      success: true,
      discount,
      finalAmount,
      offer,
    });
  } catch (error) {
    console.error("Apply coupon error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to apply coupon",
    });
  }
};
