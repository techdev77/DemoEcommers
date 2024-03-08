const { structureResponse, hashPassword,comparePassword,generateAccessToken,generateRefreshToken } = require('../utils/common.utils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendOTPEmail } = require('../utils/sendEmail.utils');
const otpGenerator = require('otp-generator');
const { Config } = require('../configs/config');
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


class ProductsRepository {

    getAllProducts=async()=>{
        try{
            let products=await ProductModel.findAll();
            
            if(products){
                return  {success:true,message:"",data:products};
            }
            else{
                return  {success:false,message:"Products not available."};
            }
        }
        catch(error){
            return  {success:false,message:"Something went wrong."};
        }
    }



    getAllBooks=async(body)=>{
        try{
            let products=await ProductModel.findAll({where:{category_id:body.category_id}});
            
            if(products){
                return  {success:true,message:"",data:products};
            }
            else{
                return  {success:false,message:"Products not available."};
            }
        }
        catch(error){
            return  {success:false,message:"Something went wrong."};
        }
    }
    

}

module.exports = new ProductsRepository;