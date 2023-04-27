// const express = require("express");  this are use in commonjs. now we use module.
// const colors = require("colors");
import express from "express";
import Colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./router/authRoute.js";
import categoryRoutes from "./router/categoryRoutes.js";
import productRoutes from "./router/productRoutes.js";
import cors from "cors";
import path from "path";
import {fileURLToPath} from 'url';

// configer
dotenv.config(); // if location is different then==> dotenv.config({path:'./'})

// connet database
connectDB();

//esmodule 6 error in es 6 module
const __filename= fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// create rest objectsjsj
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/build")));
//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// rest api
// app.get("/", (req, res) => {
//   res.send("<h1>Welcome to ecom website </h1>");
// });
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
// port
const PORT = process.env.PORT || 8080;

//run listener
app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`.bgCyan.white);
});
