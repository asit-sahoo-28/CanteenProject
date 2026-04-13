
import mongoose from "mongoose";

const offerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,

    couponCode: {
      type: String,
      unique: true,
      uppercase: true,
      trim: true,
    },

    discountType: {
      type: String,
      enum: ["percentage", "flat"],
      required: true,
    },

    discountValue: { type: Number, required: true },

    minOrderAmount: { type: Number, default: 0 },

    maxDiscountAmount: Number,

    isFirstOrderOnly: { type: Boolean, default: false },

    isFestivalOffer: { type: Boolean, default: false },

    bannerImage: String,

    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Offer", offerSchema);