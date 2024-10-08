const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const {sequelize} = require('./models');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yaml');
const fs = require('fs');
const http = require('http');
require('dotenv').config()

// Middleware
const { rateLimit } = require('./middleware/rateLimit.js');

// Setup Our App
const app = express();
const server = http.createServer(app);
app.use(morgan(':method :url :status :response-time ms - :res[content-length] \n'));
app.use(bodyParser.json());
app.use(cors({ origin: process.env.ORGIN }));
app.use(rateLimit);

// Setup Sockets and Routes
require('./sockets')(server);
require('./routes')(app);

// Setup Swagger Docs
const swaggerDoc = YAML.parse(fs.readFileSync('./swagger.yaml', 'utf8'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc, { customCss: '.swagger-ui .topbar { display: none }' }));

// Sync Databases and Serve project
sequelize.sync().then(() => {
    server.listen(process.env.PORT, process.env.HOST, () => {
        console.log(`Server started on http://${process.env.HOST}:${process.env.PORT}`);
    });
});