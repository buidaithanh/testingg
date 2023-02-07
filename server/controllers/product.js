const Product = require("../models/Product");

exports.getListProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, productsList: products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "server error" });
  }
};

exports.createProduct = async (req, res) => {
  const { name, desc, picture, price } = req.body;

  if (!name || !desc || !picture || !price) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill in all fields" });
  }

  try {
    const newProduct = new Product({ name, desc, picture, price });
    await newProduct.save();
    res.json({
      success: true,
      message: "created successfully",
      post: newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "server error" });
  }
};
//update Product
exports.updateProduct = async (req, res) => {
  const { name, desc, picture, price } = req.body;
  if (!name || !desc || !picture || !price) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill in all fields" });
  }

  try {
    let updateProduct = {
      name,
      desc,
      picture,
      price,
    };
    const productUpdateCondition = { _id: req.params.id };
    updateProduct = await Product.findOneAndUpdate(
      productUpdateCondition,
      updateProduct,
      { new: true }
    );
    res.json({
      success: true,
      message: "updated successfully!",
      updateProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "server error" });
  }
};

//update Product
exports.deleteProduct = async (req, res) => {
  try {
    const productDeleteCondition = { _id: req.params.id };
    const deleteProduct = await Product.findOneAndDelete(
      productDeleteCondition
    );
    res.json({
      success: true,
      message: "deleted successfully!",
      deleteProduct,
    });
    res.json();
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "server error" });
  }
};
