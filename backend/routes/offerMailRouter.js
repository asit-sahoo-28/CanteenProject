import express from "express";
import { sendOfferMailToAllUsers } from "../controllers/offerMailController.js";
// import adminMiddleware from "../middlewares/adminMiddleware.js";
import { generateOfferMessage } from "../controllers/offerMailController.js";
const offerMailRouter = express.Router();

// Only admin can send broadcast mail
offerMailRouter.post("/send", sendOfferMailToAllUsers);




offerMailRouter.post("/ai-message", generateOfferMessage);
export default offerMailRouter;
