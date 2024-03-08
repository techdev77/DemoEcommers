const { checkValidation } = require('../middleware/validation.middleware');

const ProductsRepository = require('../repositories/product.repository');

class PrductController {

    getAllProducts = async (req, res, next) => {
        checkValidation(req);
        const response = await ProductsRepository.getAllProducts();
        res.json(response);
    };

    getAllBooks = async (req, res, next) => {
        checkValidation(req);
        const response = await ProductsRepository.getAllBooks(req.body);
        res.json(response);
    };

}

module.exports = new PrductController;