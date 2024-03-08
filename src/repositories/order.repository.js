const { structureResponse, hashPassword,comparePassword,generateAccessToken,generateRefreshToken } = require('../utils/common.utils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendOTPEmail } = require('../utils/sendEmail.utils');
const otpGenerator = require('otp-generator');
const { Config } = require('../configs/config');
const OrderModel = require('../models/order.model');
const ProductModel = require('../models/product.model');
const { Sequelize} = require('sequelize');

const {
    RegistrationFailedException,
    InvalidCredentialsException,
    TokenVerificationException,
    OTPExpiredException,
    OTPGenerationException,
    OTPVerificationException
} = require('../utils/exceptions/auth.exception');

const {
    NotFoundException,
    UpdateFailedException,
    UnexpectedException
} = require('../utils/exceptions/database.exception');


class OrderRepository {
    order=async(body)=>{

        body.total_amount=body.order_quantity*body.total_amount;
        try{
        let product= await ProductModel.findOne({where:{id:body.product_id,stock_quantity: { [Sequelize.Op.gt]: parseInt(body.order_quantity)-1 }}});
        if(product){
            var order=await OrderModel.create(body)
        if(!order){
            return {success:false,message:"Your order not created."};    
        }
            product.stock_quantity=product.stock_quantity-body.order_quantity;  
            if( await product.save()){     
                return  {success:true,message:"Your order created successfully."};
            }
        }
        else{
            return  {success:true,message:"Product stock quantity is insufficient."};
        }
    }
    catch(error){
        await order.destroy();
        return  {success:true,message:"Something went wrong."};
    }
         
    }

}

module.exports = new OrderRepository;