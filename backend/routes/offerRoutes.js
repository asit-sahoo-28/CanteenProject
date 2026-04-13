import express from "express";
import {
  addOffer,
  getActiveOffers,
  applyCoupon,
} from "../controllers/offerController.js";

const router = express.Router();

router.post("/add", addOffer);
router.get("/active", getActiveOffers);
router.post("/apply", applyCoupon);

export default router;

