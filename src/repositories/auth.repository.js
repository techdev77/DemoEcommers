const { structureResponse, hashPassword,comparePassword,generateAccessToken,generateRefreshToken } = require('../utils/common.utils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendOTPEmail } = require('../utils/sendEmail.utils');
const otpGenerator = require('otp-generator');
const { Config } = require('../configs/config');
const UserModel = require('../models/user.model');


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


class AuthRepository {


    getAll=async()=>{
        const users=await UserModel.findAll();
        return {
            success: true,
            message: '',
            data: users
        };
    }



    registerUser = async (body) => { 
        try{
         body.password=await hashPassword(body.password);
         const dublicateEmail = await UserModel.findOne({ where: { email: body.email } });
           if(dublicateEmail){
            return {"success":false,"message":"Email already exists!"};
           }
           
           body.auth_type = "NORMAL";
            const newUser = await UserModel.create(body);

        if (!newUser) {
            throw new RegistrationFailedException();
        }
        return structureResponse("", true, "You are Registered Successfully.");
    }
    catch(error){
        console.error("Error creating user:", error);
        throw error; 
    }
        // return this.userLogin(body.email, pass, true);
    };

    


    userLogin = async (email, pass, is_register = false) => {
        const user = await UserModel.findOne({ where: { email: email } });
        if (!user) {
            throw new InvalidCredentialsException('Email not registered');
        }

           const isMatch = await bcrypt.compare(pass, user.password);

           if (!isMatch) {
            throw new InvalidCredentialsException('Incorrect password');
           }

        const auth_token=generateAccessToken(user.id,user.created_at,user.email);
        const refreshToken=generateRefreshToken(user.id,user.created_at,user.email);

        const updates={auth_token:auth_token,refresh_token:refreshToken}

        const [numAffectedRows, affectedRows] = await UserModel.update(updates, {
            where: { email: email }
        });

      if(affectedRows<=0){
        throw new UpdateFailedException("AuthToken Updation Failed.");
      }
        let message = "";
        let responseBody = "";
        if (is_register){ 
            message = "Registered"; 
            user.auth_token=auth_token;
            responseBody =  user;
        } else {
            message = "Authenticated";
            user.auth_token=auth_token;
            responseBody = user;
        }
        return structureResponse(responseBody, true, message);
    };


    refreshToken = async (body) => {
        const { email, password: pass, oldToken } = body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new InvalidCredentialsException('Email not registered');
        }

        const isMatch = await bcrypt.compare(pass, user.password);

        if (!isMatch) {
            throw new InvalidCredentialsException('Incorrect password');
        }

        // user matched!
        const { user_id } = jwt.decode(oldToken);
        
        if (user.user_id.toString() !== user_id){
            throw new TokenVerificationException();
        }
        
        const token = jwt.sign({ user_id: user.user_id.toString() },  Config.SECRET_JWT, {
            expiresIn: '2m'
        });

        return structureResponse({ token }, 1, "Refreshed");
    };


    forgotPassword = async (body) => {
        let user = await UserModel.findOne({ where: { email: body.email } });
       
        if (!user) {
            throw new InvalidCredentialsException('Email not registered');
        }
        
        const OTP = await this.#generateOTP(body.uid, body.email);
        user.otp=OTP;
        await user.save();
        var res=false;
        await sendOTPEmail(user.email, OTP)
        .then(success => {
            res=true;
        }).catch(error => {
            res=false;
       });
      if(res){
      return structureResponse({}, true, 'OTP generated and sent via email');
       }
        return structureResponse({}, false, 'Something went wrong.');
    }

    #generateOTP = async (id, email) => {
        const OTP = `${otpGenerator.generate(6, {digits:true, specialChars: false, upperCaseAlphabets: false,lowerCaseAlphabets:false })}`;

        const OTPHash = await bcrypt.hash(OTP, 8);
        // let expiration_datetime = new Date();
        // expiration_datetime.setHours(expiration_datetime.getHours() + 1);
        
        const body = {id, email, otp: OTPHash};
        // const result = await OTPModel.create(body);

        // if (!result) throw new OTPGenerationException();

        return OTP;
    }

    verifyOTP = async (body) => {
        const {otp, email} = body;
        // let result = await OTPModel.findOne({email});

        if (!result) {
            throw new OTPVerificationException();
        }

        const {expiration_datetime, otp: OTPHash} = result;

        if (expiration_datetime < new Date()) {
            throw new OTPExpiredException();
        }

        const isMatch = await bcrypt.compare(otp, OTPHash);

        if (!isMatch) {
            throw new OTPVerificationException();
        }

        // result = await OTPModel.delete({email});

        if (!result) {
            throw new OTPVerificationException('Old OTP failed to be deleted');
        }

        return structureResponse({}, true, 'OTP verified succesfully');
    }

    changePassword = async (body) => {
        const { email, password, new_password } = body;
        const user = await UserModel.findOne({  email });

        if (!user) {
            throw new NotFoundException('User not found');
        }
        //   console.log(user);
        const isMatch = await bcrypt.compare(password, user[0].password);

        if (!isMatch) {
            throw new InvalidCredentialsException('Incorrect old password');
        }

        let responseBody = { email: email, password: new_password };

        return this.resetPassword(responseBody);
    };

    resetPassword = async (body) => {
        await hashPassword(body);

        const { password, email } = body;

        const result = await UserModel.update({password}, {email});

        if (!result) {
            throw new UnexpectedException('Something went wrong');
        }
        
        const { affectedRows, changedRows, info } = result[0];

        if (!affectedRows) throw new NotFoundException('User not found');
        else if (affectedRows && !changedRows) throw new UpdateFailedException('Password change failed');
        
        return structureResponse(info, true, 'Password changed successfully');
    }
}

module.exports = new AuthRepository;