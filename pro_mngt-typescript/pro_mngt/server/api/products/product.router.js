const products = require("../products/product.service");
const { authenticateUser } = require('../../middleware/authmiddleware');

var router = require("express").Router();

// Create a new product
router.post("/", authenticateUser, products.create);

// Retrieve all products
router.get("/", products.findAllProducts);

// Retrieve a single product with id
router.get("/:id", products.findOne);

// Update a product with id
router.put("/:id", authenticateUser, products.update);

// Delete a product with id
router.delete("/:id", authenticateUser, products.delete);

module.exports = router;