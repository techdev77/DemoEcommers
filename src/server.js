const connectDB= require('./connections/database.connection');
const { ExpressLoader } = require('./connections/express.connection');
const { MiddlewareLoader } = require('./connections/middleware.connection');
const { Config } = require('./configs/config');

// connect database
connectDB.init();
const { RoutesLoader } = require('./connections/route.connection');


// load express
const app = ExpressLoader.init();

const version = "v1";
RoutesLoader.initRoutes(app, version);

// init middleware
MiddlewareLoader.init(app);

// starting the server
const port = Number(Config.PORT);
app.listen(port, () => console.log(`
  ==================================
  🚀 Server running on port ${port}!🚀
  ==================================
`));

module.exports = app;