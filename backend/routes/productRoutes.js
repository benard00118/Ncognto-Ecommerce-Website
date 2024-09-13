const express = require('express');
const router = express.Router();

// Sample route for GET products
router.get('/', (req, res) => {
  res.send('List of products');
});

// Sample route for POST new product
router.post('/', (req, res) => {
  const { name, price } = req.body;
  // Add logic to handle adding the product to the database
  res.send(`Product ${name} added with price ${price}`);
});

// Sample route for PUT update product
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  // Add logic to handle updating the product in the database
  res.send(`Product ${id} updated with name ${name} and price ${price}`);
});


module.exports = router;
