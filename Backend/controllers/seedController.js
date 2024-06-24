import Product from "../models/Product.js";
import User from "../models/User.js";
import data from "../data.js";

const seedData = async (req, res) => {
  try {
    const [createdProdects, createdUsers] = await Promise.all([
      Product.deleteMany({}).then(() => Product.insertMany(data.products)),
      User.deleteMany({}).then(() => User.insertMany(data.users)),
    ]);
    res.send({ createdProdects, createdUsers });
  } catch (error) {
    console.log(error.message);
  }
};

export default seedData;
