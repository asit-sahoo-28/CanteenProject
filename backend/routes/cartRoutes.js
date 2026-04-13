import express from "express";
import { addToCart,removeCart,getCart } from "../controllers/cardController.js";
import authMiddleware from "../middlewares/authMiddleware.js";



const cartRouter=express.Router();


cartRouter.post("/add",authMiddleware,addToCart);
cartRouter.post("/remove",authMiddleware,removeCart);
cartRouter.post("/get",authMiddleware,getCart);

export default cartRouter;