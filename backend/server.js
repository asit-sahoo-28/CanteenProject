

// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";

// import connectDB from "./config/db.js";
// import http from "http";
// import foodRouter from "./routes/foodRoutes.js";
// import userRoute from "./routes/userRoutes.js";
// import cartRouter from "./routes/cartRoutes.js";
// import orderRouter from "./routes/orderRoutes.js";
// import searchRouter from "./routes/searchRoutes.js";
// import offerRoutes from "./routes/offerRoutes.js";
// import offerMailRouter from "./routes/offerMailRouter.js";
// import { initSocket } from "./socket.js"; // 👈 ADD
// dotenv.config();

// /* ===== DB CONNECTION ===== */
// connectDB();

// const app = express();

// /* ===== MIDDLEWARE ===== */

// app.use(express.json());
// app.use(cookieParser());

// app.use(
//   cors({
//     origin: true,
//     credentials: true,
//   })
// );

// /* ===== STATIC FILES ===== */
// // app.use("/images", express.static("uploads"));

// /* ===== ROUTES ===== */

// app.use("/api/food", foodRouter);
// app.use("/api/food", searchRouter);
// app.use("/api/v1/auth", userRoute);
// app.use("/api/cart", cartRouter);
// app.use("/api/order", orderRouter);
// app.use("/api/offers", offerRoutes);





// app.use("/api/offer-mail", offerMailRouter);

// /* ===== TEST ROUTE ===== */

// app.get("/", (req, res) => {
//   res.send("Server is running 🚀");
// });

// /* ===== SERVER ===== */

// const PORT = process.env.PORT || 5000;

// // ✅ CREATE HTTP SERVER
// const server = http.createServer(app);

// // ✅ INIT SOCKET
// initSocket(server);


// server.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
// });


// export default app;






import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import http from "http";
import foodRouter from "./routes/foodRoutes.js";
import userRoute from "./routes/userRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import searchRouter from "./routes/searchRoutes.js";
import offerRoutes from "./routes/offerRoutes.js";
import offerMailRouter from "./routes/offerMailRouter.js";
import { initSocket } from "./socket.js";

dotenv.config();

/* ===== DB CONNECTION ===== */
connectDB();

const app = express();

/* ===== MIDDLEWARE ===== */
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

/* ===== ROUTES ===== */
app.use("/api/food", foodRouter);
app.use("/api/food", searchRouter);
app.use("/api/v1/auth", userRoute);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/offers", offerRoutes);
app.use("/api/offer-mail", offerMailRouter);

/* ===== TEST ROUTE ===== */
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

/* ===== SERVER ===== */
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "test") {
  const server = http.createServer(app);
  initSocket(server);

  server.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
}

export default app;