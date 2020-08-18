import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";

import auth from "./routes/auth.routes";
import product from "./routes/product.routes";
import order from "./routes/order.routes";

const app = express();

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(auth);
app.use("/products", product);
app.use("/orders", order);

// Static files
app.use("/uploads", express.static(path.resolve("uploads")));
app.use(express.static(path.join(__dirname, "public")));

export default app;
