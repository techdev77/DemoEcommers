const express = require('express');
var multer = require('multer');
var upload = multer();
const router = express.Router();
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const authMiddleware = require('../middleware/auth.middleware');
const authController = require('../controllers/auth.controller');
const configController = require('../controllers/config.controller');
const { createUserSchema, passwordUserSchema,emailUserSchema} = require('../middleware/validators/userValidator.middleware');
// const { validateLogin, forgotPWSchema, resetPWSchema, changePWSchema, verifyOTPSchema, validateRefresh } = require('../middleware/validators/authValidator.middleware');

router.get('/getConfig',authMiddleware,awaitHandlerFactory(configController.getConfig)); 
router.post('/register',upload.fields([]),createUserSchema,awaitHandlerFactory(authController.registerUser)); 
router.post('/login',upload.fields([]), passwordUserSchema,awaitHandlerFactory(authController.userLogin)); 
router.post('/forgotPassword',authMiddleware,upload.fields([]), emailUserSchema,awaitHandlerFactory(authController.forgotPassword)); 
router.post('/getAll',authMiddleware, awaitHandlerFactory(authController.getAll)); 

module.exports = router;