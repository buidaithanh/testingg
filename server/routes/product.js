const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/product");
const verifyToken = require("../middleware/auth");

//route POST api/product
router.post("/", verifyToken, ProductController.createProduct);
router.get("/", ProductController.getListProducts);
router.put("/:id", ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);

module.exports = router;
