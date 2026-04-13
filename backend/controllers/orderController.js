

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";
import { getIO } from "../socket.js";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET);

// ===============================
// PLACE ORDER
// ===============================
export const placeOrder = async (req, res) => {
  const frontend_url = process.env.FRONTEND_URL;

  try {
    const { items, paymentMethod = "ONLINE" } = req.body;

    if (!items || items.length === 0) {
      return res.json({ success: false, message: "Cart empty" });
    }

    let amount = 0;
    items.forEach((i) => (amount += i.price * i.quantity));
    amount += 1;

    // ===============================
    // 🟡 COD FLOW
    // ===============================
    if (paymentMethod === "COD") {
      const newOrder = new orderModel({
        userId: req.userId,
        items,
        amount,
        paymentMethod: "COD",
        payment: false,
        paymentReceived: false,
        status: "Placed",
      });

      await newOrder.save();

      // 🔔 EMIT
      const io = getIO();
      io.to("admin").emit("new_order", newOrder);

      await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

      return res.json({ success: true, cod: true });
    }

    // ===============================
    // 🟢 ONLINE FLOW (NO SAVE ❌)
    // ===============================
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: items.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: { name: item.name },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),

      success_url: `${frontend_url}/verify?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontend_url}/verify?success=false`,

metadata: {
  items: JSON.stringify(items),
  userId: req.userId.toString(),  // 🔥 FIX
  amount: amount.toString(),      // 🔥 FIX
}
    });

    return res.json({
      success: true,
      session_url: session.url,
    });

  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

// ===============================
// VERIFY AFTER PAYMENT
// ===============================
export const verifyOrder = async (req, res) => {
  try {
    const { session_id } = req.body;

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") {
      return res.json({ success: false });
    }

    const items = JSON.parse(session.metadata.items);
    const userId = session.metadata.userId.toString();
const amount = Number(session.metadata.amount);

    // ✅ SAVE ORDER AFTER PAYMENT
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      paymentMethod: "ONLINE",
      payment: true,
      paymentReceived: true,
      status: "Placed",
    });

    await newOrder.save();

    // 🔔 EMIT AFTER PAYMENT
    const io = getIO();
    io.to("admin").emit("new_order", newOrder);

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true });

  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

// ===============================
// OTHER APIs
// ===============================
export const receiveCODPayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await orderModel.findById(orderId);
    order.paymentReceived = true;
    order.payment = true;

    await order.save();

    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
};

export const listOrders = async (req, res) => {
  const orders = await orderModel.find({}).sort({ createdAt: -1 });
  res.json({ success: true, data: orders });
};

export const updateOrderStatus = async (req, res) => {
  const { orderId, status } = req.body;

  const order = await orderModel.findById(orderId);
  order.status = status;

  await order.save();

  res.json({ success: true, data: order });
};

export const userOrder = async (req, res) => {
  const orders = await orderModel.find({ userId: req.userId });
  res.json({ success: true, data: orders });
};

export const cancelOrder = async (req, res) => {
  const { orderId } = req.body;

  const order = await orderModel.findById(orderId);
  order.status = "Cancelled";

  await order.save();

  res.json({ success: true });
};