const controllers = require('./controllers'); 

const multer = require('multer'); // Used for file uploads
const upload = multer({ dest: './src/downloads/' });

module.exports = (app) => {
    // Development Debugging Routes
    app.get('/heartbeat', controllers.devController.heartbeat);

    // Media Routes
    app.post('/downloadMedia', controllers.mediaController.downloadMedia);
    app.post('/convertImage', upload.single('file'), controllers.mediaController.convertImage);
    app.post('/convertVideo', upload.single('file'), controllers.mediaController.convertVideo);

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

    // Speedtest Routes
    app.post('/upload', upload.single('file'), controllers.speedTestController.upload);
    app.post('/testUpload', upload.single('file'), controllers.speedTestController.testUp);
    app.get('/testDownload', controllers.speedTestController.testDown);

    // Nmap Routes
    app.post('/nmap', controllers.nmapController.nmap);

    // Css Routes
    app.post('/css', controllers.cssController.css);

    // Whois/Dns Routes
    app.post('/whois', controllers.domainController.whois);
    app.post('/dns', controllers.domainController.dns);

}