import Product from "../models/Product.js";
import User from "../models/User.model.js";
import data from "../data.js";

const seedData = async (req, res) => {
  try {
    await Promise.all([Product.deleteMany({}), User.deleteMany({})]);

    let products;
    let users;

    await Promise.all([
      (products = Product.insertMany(data.products)),
      (users = User.insertMany(data.users)),
    ]);

    res.send({ products, users });
  } catch (error) {
    console.log(error);
  }
};

export default seedData;
