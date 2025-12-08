
const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.get('/all', productController.getAllproducts);

router.get('/:id', productController.getproductById);

router.post('/', productController.createproduct);

router.put('/:id', productController.updateproduct);

router.delete('/:id', productController.deleteproduct);

module.exports = router;
