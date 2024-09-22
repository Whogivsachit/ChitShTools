const rateLimit = require('express-rate-limit');

const rateLimits = rateLimit({
    windowMs: process.env.RATE_LIMIT || 60 * 1000,
    max: process.env.RATE_LIMIT_MAX || 20,
    message: { status: 429, message: 'Woah slow down! You\'re making too many requests. (20 requests every 1 minute)'},
    headers: true,
    keyGenerator: function (req) {
        return req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
      }
});


module.exports = {
    rateLimit: rateLimits,
}