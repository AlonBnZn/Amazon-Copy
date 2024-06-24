import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import seedRouter from "./routes/seedRouter.js";
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routers
app.use("/api/v1/seed", seedRouter);
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
