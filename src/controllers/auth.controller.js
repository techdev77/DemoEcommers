const { checkValidation } = require('../middleware/validation.middleware');

const AuthRepository = require('../repositories/auth.repository');

class AuthController {

    registerUser = async (req, res, next) => {
        console.log(req.email);
        checkValidation(req);
        const response = await AuthRepository.registerUser(req.body);
        res.json(response);
    };

    getAll = async (req, res, next) => {
        const response = await AuthRepository.getAll();
        res.json(response);
    };

    userLogin = async (req, res, next) => {
        checkValidation(req);
        const response = await AuthRepository.userLogin(req.body.email, req.body.password);
        res.send(response);
    };

    refreshToken = async (req, res, next) => {
        checkValidation(req);
        const response = await AuthRepository.refreshToken(req.body);
        res.send(response);
    };

    forgotPassword = async (req, res, next) => {
        req.body.uid=req.uid;
        // console.log(req.uid);
        checkValidation(req);
        const response = await AuthRepository.forgotPassword(req.body);
        res.json(response);
    }

    verifyOTP = async (req, res, next) => {
        checkValidation(req);
        const response = await AuthRepository.verifyOTP(req.body);
        res.send(response);
    }

    changePassword = async (req, res, next) => {
        checkValidation(req);
        const response = await AuthRepository.changePassword(req.body);
        res.send(response);
    };

    resetPassword = async (req, res, next) => {
        checkValidation(req);
        const response = await AuthRepository.resetPassword(req.body);
        res.send(response);
    }
}

module.exports = new AuthController;