/* Routes */
const authRouter = require('../routes/auth.routes');
const orderRouter = require('../routes/order.routes');
const productRouter = require('../routes/product.routes');

class RoutesLoader {
    static initRoutes (app, version) {
        app.use(`/api/${version}`, authRouter,orderRouter,productRouter);
    
    }
}

module.exports = {RoutesLoader};