import Stripe from "stripe";
import orderModel from "../models/orderModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET);

export const verifySession = async (req, res) => {
  try {
    const { session_id } = req.body;

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      await orderModel.findByIdAndUpdate(session.metadata.orderId, {
        payment: true,
        status: "Processing",
      });

      return res.json({ success: true });
    }

    res.json({ success: false });
  } catch (error) {
    console.error(error);
    res.json({ success: false });
  }
};
