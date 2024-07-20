const QRCode = require('qrcode');
const { qrCodes } = require('../models');

exports.generateQrCode = async (req, res) => {
    const { text, theme } = req.body;
    const creator = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
    if(!text) return res.send({status: 400, message: 'Malformed Body'});

    const themes = {
        classic: {
            dark: '#000000',
            light: '#FFFFFF'
        },
        dark: {
            dark: '#FFFFFF',
            light: '#171717' // Default background 1f1f23
        },
        chitsh: {
            dark: '#FA4033',
            light: '#171717'
        },
        orange: {
            dark: '#FFA000',
            light: '#000000'
        }
    }

    // User selected theme or default
    const selectedTheme = themes[theme] || themes.classic;

    let options = {
        color: {
            dark: selectedTheme.dark,
            light: selectedTheme.light
        },
        errorCorrectionLevel: 'H'
    };

    const qrCodeData = await QRCode.toDataURL(text, options);
    await qrCodes.create({ body: text, qrCode: qrCodeData, creator: creator });

    res.status(200).send({ status: 200, message: 'QR Code Generated', data: qrCodeData });

};