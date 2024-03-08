const express = require('express');
var multer = require('multer');
var upload = multer();
const router = express.Router();
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const authMiddleware = require('../middleware/auth.middleware');
const orderController = require('../controllers/order.controller');



router.post('/order',upload.fields([]),authMiddleware,awaitHandlerFactory(orderController.order));

module.exports = router;