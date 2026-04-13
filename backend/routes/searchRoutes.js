
import express from "express";
import foodModel from "../models/foodModel.js";

const router = express.Router();

/**
 * GET /api/food/search?q=piz
 * Matches query anywhere in the name, case-insensitive
 */
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === "") return res.json([]);

    const foods = await foodModel.find({
      name: { $regex: q, $options: "i" }, // ✅ match anywhere
    })
      .limit(10)
      .select("name price image category");

    res.json(foods);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;