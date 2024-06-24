import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import seedRouter from "./routes/seedRouter.js";
import productRouter from "./routes/productRouter.js";

dotenv.config();
const PORT = process.env.PORT || 8080;
const app = express();

// Configure CORS
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};
// app.use(cors());

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routers
app.use("/api/v1/seed", seedRouter);
app.use("/api/v1/products", productRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port  ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
