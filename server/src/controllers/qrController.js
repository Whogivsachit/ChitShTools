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

    // Check if QR Code already exists
    const qrCodeExists = await qrCodes.findOne({ where: { body: text, theme: colors } });
    if(qrCodeExists) return res.send({ status: 200, message: 'QR Code Already Exists', data: qrCodeExists.qrCode });

    await qrCodes.create({ body: text, qrCode: qrCodeData, theme: colors, creator: creator });
    res.status(200).send({ status: 200, message: 'QR Code Generated', data: qrCodeData });

};