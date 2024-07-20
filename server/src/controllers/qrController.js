const QRCode = require('qrcode');
const { qrCodes } = require('../models');

exports.generateQrCode = async (req, res) => {
    const { text, colors } = req.body;
    const creator = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
    
    if(!text) return res.send({status: 400, message: 'Malformed Body'});
    if(!colors) {
        colors = {
            background: '#FFFFFF',
            foreground: '#000000'
        };
    }

    let options = {
        color: {
            dark: colors.foreground,
            light: colors.background
        },
        errorCorrectionLevel: 'H'
    };

    const qrCodeData = await QRCode.toDataURL(text, options);
    await qrCodes.create({ body: text, qrCode: qrCodeData, creator: creator });

    res.status(200).send({ status: 200, message: 'QR Code Generated', data: qrCodeData });

};