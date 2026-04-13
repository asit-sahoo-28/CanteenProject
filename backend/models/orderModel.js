

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },

    items: { type: Array, required: true },

    amount: { type: Number, required: true },
    originalAmount: { type: Number },
    discountAmount: { type: Number },

    couponCode: { type: String, default: null },

    status: {
      type: String,
      default: "Placed",
    },

    payment: {
      type: Boolean,
      default: false,
    },

    paymentMethod: {
      type: String,
      enum: ["ONLINE", "COD"],
      default: "ONLINE",
    },

    paymentReceived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
