const express = require('express');
var multer = require('multer');
var upload = multer();
const router = express.Router();
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const authMiddleware = require('../middleware/auth.middleware');
const productController = require('../controllers/product.controller');

router.get('/getAllProducts',upload.fields([]),authMiddleware,awaitHandlerFactory(productController.getAllProducts));

router.post('/getAllBooks',upload.fields([]),authMiddleware,awaitHandlerFactory(productController.getAllBooks));

module.exports = router;