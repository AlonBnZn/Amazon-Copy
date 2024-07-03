import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import seedRoute from "./routes/seedRoute.js";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose
  .connect(process.env.MONGO_CONNETION_STRING)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `connected to MongoDb ||` + ` server running on port ${PORT}`
      );
    });
  })
  .catch((err) => {
    console.log(err.message);
  });

//routers
app.use("/api/users", userRoute);
app.use("/api/v1/seed", seedRoute);
app.use("/api/v1/products", productRoute);
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
//not found handler
