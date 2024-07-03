import express from "express";
import seedData from "../controllers/seedController.js";

const seedRoute = express.Router();
seedRoute.route("/").get(seedData);

export default seedRoute;
