const { checkValidation } = require('../middleware/validation.middleware');

const OrderRepository = require('../repositories/order.repository');

class OrderController {

    order = async (req, res, next) => {
        req.body.user_id=req.uid;
        checkValidation(req);
        const response = await OrderRepository.order(req.body);
        res.json(response);
    };

}

module.exports = new OrderController;