import dotenv from "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
const PORT = 5000;

import "./database/db.js";
import router from "./router/index.js"

const app = express();

app.use(
   cors({
      origin: "*"
   })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router());

app.listen(PORT, error => {
   console.log(`Server started at http://localhost:${PORT}`);
});
