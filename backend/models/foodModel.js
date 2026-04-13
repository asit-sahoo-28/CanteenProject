
import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },

  // ⭐ NEW FIELDS
  isAvailable: { type: Boolean, default: true },
  stock: { type: Number, default: 20 },
  isFlashSale: { type: Boolean, default: false },
});

foodSchema.index({ name: 1 });

const foodModel =
  mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;