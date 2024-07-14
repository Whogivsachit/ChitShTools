const nodemailer = require('nodemailer');

exports.sendEmail = async (req, res) => {
    const { smtpServer, smtpPort, smtpSecurity, username, password, to, from } = req.body;
    if(!smtpServer || !smtpPort || !smtpSecurity || !username || !password || !to || !from) return res.send({status: 400, message: 'Malformed Body'});

    // Set security options 
    smtpSecurity === 465 ? secure = true : secure = false;

    // Create transporter for nodemailer with provided SMTP credentials
    const transporter = nodemailer.createTransport({
        host: smtpServer,
        port: smtpPort,
        secure: secure,
        auth: {
            user: username,
            pass: password
        },
        tls: { // Not for production bypass rejection for local development
            rejectUnauthorized: false
        }
    });


    // Test login prior to attempting to send email
    transporter.verify(async function(error, success) {
        if(error) {
            res.send({status: 400, message: 'Invalid SMTP Credentials'});
        } else {
            // Finally send the email
            await transporter.sendMail({
                from: `[CshTools] <${from}>`,
                to: to,
                subject: `[CshTools] Test Email ✔`,
                text: `Hello, this is a test email from CshTools! Everything is working properly`, 
            });
            res.send({status: 200, message: 'Email sent successfully!'});
        }
    });

}