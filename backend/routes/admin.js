const express = require("express");
const router = express.Router();
const Product = require("../models/productmodel");
const { cloudinary } = require("../cloudconfig");
const wrapAsync = require("../utils/wrapasync");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

router.post(
  "/addproduct",
  wrapAsync(async (req, res) => {
    const all_product = await Product.find({});
    let id;
    if (all_product.length > 0) {
      let lastproduct_array = all_product.slice(-1);
      let lastproduct = lastproduct_array[0];
      id = lastproduct.id + 1;
    } else {
      id = 1;
    }
    const product = new Product({
      id: id,
      name: req.body.name,
      image: {
        url: req.body.image,
        filename: req.body.filename,
      },
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });

    await product.save();
    // console.log(product22);
    // res.send("product add Successfully")
    res.json({
      success: true,
      name: req.body.name,
    });
  })
);

router.get(
  "/allproducts",
  wrapAsync(async (req, res) => {
    let products = await Product.find({});
    res.send(products);
  })
);

module.exports = router;

