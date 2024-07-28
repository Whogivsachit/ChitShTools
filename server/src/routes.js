const controllers = require('./controllers'); 

const multer = require('multer'); // Used for file uploads
const upload = multer({ dest: 'uploads/' });

module.exports = (app) => {
    // Development Debugging Routes
    app.get('/heartbeat', controllers.devController.heartbeat);

    // Media Routes
    app.post('/downloadMedia', controllers.mediaController.downloadMedia);

    // Game Routes
    app.post('/fetchServerInfo', controllers.gameController.fetchServerInfo);

    // Discord Routes
    app.post('/sendWebhook', controllers.discordController.sendWebhook);

    // Email Routes
    app.post('/sendEmail', controllers.emailController.sendEmail);

    // Workshop Routes
    app.post('/generateWorkshop', controllers.workshopController.generateWorkshop);

    // Url Shortener Routes
    app.post('/shorten', controllers.urlController.shortenUrl);
    app.get('/shorten/:shortUrl', controllers.urlController.redirectUrl);

    // QR Code Routes
    app.post('/generateQRCode', controllers.qrController.generateQrCode);

    // PDF Routes
    app.post('/convertToPdf', upload.single('file'), controllers.pdfController.convertToPdf);

    // Default Route
    app.use((req, res) => {
        res.status(404).send({ url: req.originalUrl + ' not found' });
    });

}