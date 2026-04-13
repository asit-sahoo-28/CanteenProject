
import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {  cancelOrder, listOrders, placeOrder, userOrder, verifyOrder,updateOrderStatus, receiveCODPayment } from "../controllers/orderController.js";
import { verifySession } from "../controllers/verifySession.js";

const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders",authMiddleware,userOrder)
orderRouter.get("/list",listOrders);
orderRouter.post("/verify-session",verifySession)
orderRouter.post("/cancel", authMiddleware, cancelOrder);
orderRouter.post("/status", updateOrderStatus);
orderRouter.post("/receive-cod",receiveCODPayment);
export default orderRouter;





