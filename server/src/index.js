const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const {sequelize} = require('./models');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yaml');
const fs = require('fs');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config()

const app = express();
const server = http.createServer(app);
app.use(morgan(':method :url :status :response-time ms - :res[content-length] \n'));
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:5173' }));

// Setup Socket.io
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

const { handleSocketConnection } = require('./socket');
io.on('connection', handleSocketConnection);

// Log all incoming requests to Discord
require('./helpers/expressLogger')(app);
require('./helpers/socketLogger')(io);

// Setup Routes
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